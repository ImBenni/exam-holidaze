describe("Create Booking", () => {
    beforeEach(() => {
      cy.login();
      cy.visit("/venues");
    });
  
    it("should create a new booking on a random venue", () => {
      cy.get("div[name='venueList']").within(() => {
        cy.get('a[name="venueCard"]').first().click();
  
        cy.get('div["name=bookingCard"]').within(() => {
          // Perform actions to fill in the booking form
          // ...
  
          cy.get('button[type="submit"]').click();
        });
      });
    });
  });
  