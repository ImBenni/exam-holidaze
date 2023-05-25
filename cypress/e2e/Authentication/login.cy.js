describe("User Login", () => {
  it("should log in with valid credentials", () => {
    cy.visit("/");

    cy.get('button[type="profileButton"]').click();
    cy.contains("Log In").click(); 

    cy.url().should("include", "/login");

    cy.get('input[name="email"]').type("bennicyblanco@noroff.no");
    cy.get('input[name="password"]').type("BenniBlanco");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/profile");
  });
});
