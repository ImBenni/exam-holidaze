describe("User Logout", () => {
  beforeEach(() => {
    cy.login(); 
  });

  it("should log out successfully", () => {
    cy.visit("/");
    cy.get('button[type="profileButton"]').click();
    cy.contains("Logout").click(); 

    cy.url().should("include", "/login");
  });
});
