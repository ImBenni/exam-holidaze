describe("User Registration", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("should fail registration with incorrect input values", () => {
    cy.get('input[name="name"]').type("John.Doe");
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('input[name="avatar"]').type("invalid-url");
    cy.get('input[name="password"]').type("pass");

    cy.get('button[type="submit"]').click();

    // Registration fails
    cy.url().should("include", "/signup");
    cy.contains("Invalid name (should not contain punctuation symbols)");
    cy.contains("Invalid email address");
    cy.contains("Invalid URL");
    cy.contains("Password should be at least 8 characters");
  });

  it("should complete registration with correct input values", () => {
    // Generate dynamic values
    const name = `TestUser_${Cypress._.random(1000)}`; // e.g., TestUser_123
    const domain = Math.random() < 0.5 ? "noroff.no" : "stud.noroff.no";
    const email = `testuser_${Cypress._.random(1000)}@${domain}`; // e.g., testuser_456@noroff.no or testuser_789@stud.noroff.no      const avatarUrl = `https://example.com/avatar_${Cypress._.random(1000)}.png`; // e.g., https://example.com/avatar_789.png
    const avatarUrl = `https://picsum.photos/200`;
    const password = `TestPassword_${Cypress._.random(1000)}`; // e.g., TestPassword_321

    cy.get('input[name="name"]').type(name);    
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="avatar"]').type(avatarUrl);
    cy.get('input[name="password"]').type(password);
    cy.get('input[type="checkbox"]').check();

    cy.get('button[type="submit"]').click();

    // Registration success
    cy.url().should("include", "/login");
  });
});
