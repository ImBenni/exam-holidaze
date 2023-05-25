describe("Delete Venue", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/profile");
    cy.contains("Venues Created").click();
  });

  it("should delete a new venue", () => {
    cy.get(".MuiGrid-root .MuiCard-root").first().scrollIntoView();
    cy.get(".MuiGrid-root .MuiCard-root").first().should("be.visible");

    cy.get(".MuiGrid-root .MuiCard-root")
      .first()
      .within(() => {
        cy.get("button[name='deleteVenue']").click();
      });

    cy.get("button[name='confirmDelete']").click();
    cy.url().should("include", "/profile");
    cy.contains("Venues Created").click();
  });
});
