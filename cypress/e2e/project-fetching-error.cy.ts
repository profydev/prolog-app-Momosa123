describe("Project List Error Screen", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      forceNetworkError: true,
    }).as("getProjects");

    cy.visit("http://localhost:3000/dashboard");
    cy.wait(10000);
  });

  it("displays an error message when the request fails", () => {
    cy.get('[data-cy="fetching-error"]')
      .should("be.visible")
      .contains("There was a problem while loading");
  });

  it("reloads the data when the 'Try again' button is clicked", () => {
    cy.get("button").contains("Try again").click();
    cy.wait("@getProjects");
    cy.get('[data-cy="loading-indicator"]').should("be.visible");
    // Check the projects are loaded here
  });
});
