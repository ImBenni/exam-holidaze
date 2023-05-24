// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
  cy.visit("/");

  cy.get('button[type="profileButton"]').click();
  cy.contains("Log In").click();

  cy.url().should("include", "/login");

  cy.get('input[name="email"]').type("biggestfrog@noroff.no");
  cy.get('input[name="password"]').type("BenniBlanco");

  cy.get('button[type="submit"]').click();

  cy.url().should("include", "/profile");
});
