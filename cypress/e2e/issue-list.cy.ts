import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";

describe("Issue List", () => {
  it("shows loading screen while fetching data then renders the issue list", () => {
    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);
    cy.get('[data-cy="loading-indicator"]').should("be.visible");
    // wait for request to resolve
    cy.get('[data-cy="issue-list"]').should("be.visible");

    cy.get('[data-cy="loading-indicator"]').should("not.exist");
  });

  it("displays an error message when the request fails", () => {
    cy.intercept(
      { url: "https://prolog-api.profy.dev/project", times: 4 },
      {
        statusCode: 500,
      },
    );

    // open projects page
    cy.visit("http://localhost:3000/dashboard/issues");
    cy.get('[data-cy="fetching-error"]', { timeout: 10000 })
      .should("be.visible")
      .find("button")
      .click();
    cy.get('[data-cy="issue-list"]').should("be.visible");
  });
  context("desktop resolution", () => {
    beforeEach(() => {
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
      });
      cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
        fixture: "issues-page-1.json",
      });
      cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
        fixture: "issues-page-2.json",
      });
      cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=3", {
        fixture: "issues-page-3.json",
      });

      // open issues page
      cy.visit(`http://localhost:3000/dashboard/issues`);
      cy.viewport(1025, 900);
      // set button aliases
      cy.get("button").contains("Previous").as("prev-button");
      cy.get("button").contains("Next").as("next-button");
    });

    it("renders the issues", () => {
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = mockIssues1.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });

    it("paginates the data", () => {
      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("tbody tr:first").contains(mockIssues3.items[0].message);

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);
    });

    it("persists page after reload", () => {
      cy.get("@next-button").click();
      cy.contains("Page 2 of 3");

      cy.reload();
      cy.get('[data-cy="loading-indicator"]').should("be.visible");

      cy.get('[data-cy="loading-indicator"]').should("not.exist");
      cy.contains("Page 2 of 3");
    });
  });
});
