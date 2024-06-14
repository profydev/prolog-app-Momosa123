describe("Footer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1200, 900);
    });

    it("has the footer", () => {
      // check that each link leads to the correct page
      cy.get("footer").contains("Version: 14.5.2");

      cy.get("footer").contains("Docs");

      cy.get("footer").contains("API");

      cy.get("footer").contains("Help");

      cy.get("footer").contains("Community");
    });
  });
});
