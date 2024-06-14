import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
      delay: 2000,
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");
  });
  const statusMap = {
    error: "critical",
    warning: "warning",
    info: "stable",
  };
  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });
    it("shows loading screen while fetching data", () => {
      cy.get('[data-cy="loading-indicator"]').should("be.visible");
      // wait for request to resolve
      cy.wait("@getProjects");
      cy.get('[data-cy="loading-indicator"]').should("not.exist");
    });

    it("renders the projects", () => {
      cy.wait("@getProjects");
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
