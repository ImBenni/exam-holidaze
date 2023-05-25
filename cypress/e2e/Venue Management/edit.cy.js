describe("Edit Venue", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/profile");
    cy.contains("Venues Created").click();
  });

  it("should edit a venue", () => {
    cy.get(".MuiGrid-root .MuiCard-root").first().scrollIntoView();
    cy.get(".MuiGrid-root .MuiCard-root").first().should("be.visible");

    cy.get(".MuiGrid-root .MuiCard-root")
      .first()
      .within(() => {
        cy.get("a[name='editVenue']").click();
      });

    cy.get("form").should("be.visible");

    cy.get("#name").clear().type("bigger frog");
    cy.get("#description").clear().type("THE BIGGEST RAAAAAHHHH");
    cy.get("#price").clear().type("100");
    cy.get("#maxGuests").clear().type("20");

    cy.get("button[type='submit']").click();

    cy.contains("Venue successfully updated!");

    cy.visit("/profile");
    cy.contains("Venues Created").click();

    cy.get(".MuiGrid-root .MuiCard-root")
      .first()
      .within(() => {
        cy.get("a[name='openVenue']").click();
      });
  });
});
