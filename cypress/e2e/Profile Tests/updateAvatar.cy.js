describe("Edit Venue", () => {
    beforeEach(() => {
      cy.login();
      cy.visit("/profile");
    });
  
    it("should update avatar", () => {
      cy.get('[data-testid="editAvatar"]').first().click();
      
      // Wait for the dialog to be visible
      cy.get('.MuiDialog-root').should('be.visible');
  
      cy.get('input[type="url"]').type("https://toadsnfrogs.com/wp-content/uploads/2022/04/frog-with-birthday-hat-min.jpg");
      cy.get("button[data-testid='editConfirm']").click();
    });
  });
  