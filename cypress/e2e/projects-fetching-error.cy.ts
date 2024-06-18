describe("Project List Error Screen", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
      forceNetworkError: true,
    });

    cy.visit("http://localhost:3000/dashboard/issues");
    cy.wait(10000);
  });

  it("displays an error message when the request fails", () => {
    cy.get('[data-cy="fetching-error"]')
      .should("be.visible")
      .contains("There was a problem while loading");
  });

  it("reloads the data when the 'Try again' button is clicked", () => {
    cy.get("button").contains("Try again").click();
    cy.get('[data-cy="loading-indicator"]').should("be.visible");
    // Check the projects are loaded here
  });
});
