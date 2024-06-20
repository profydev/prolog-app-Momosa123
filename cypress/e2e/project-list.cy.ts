import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  const statusMap = {
    error: "critical",
    warning: "warning",
    info: "stable",
  };
  it("shows loading screen while fetching data then renders the project list", () => {
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    });

    // open projects page
    cy.visit("http://localhost:3000/dashboard");
    cy.get('[data-cy="loading-indicator"]').should("be.visible");
    // wait for request to resolve
    cy.get('[data-cy="project-list"]').should("be.visible");

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
    cy.visit("http://localhost:3000/dashboard");
    cy.get('[data-cy="fetching-error"]', { timeout: 10000 })
      .should("be.visible")
      .find("button")
      .click();
    cy.get('[data-cy="project-list"]').should("be.visible");
  });
  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
      // setup request mock
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
      });

      // open projects page
      cy.visit("http://localhost:3000/dashboard");
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(
            capitalize(
              statusMap[mockProjects[index].status as keyof typeof statusMap],
            ),
          );
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
  });
});
