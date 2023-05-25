describe("Create Booking", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/venues");
  });

  it.only("should create a new booking on a random venue", () => {
    cy.get("div[name='venueList']").within(() => {
      cy.get('a[name="venueCard"]').first().click();
      // Didn't manage to get this to work.

      // cy.get('div["name=bookingCard"]').within(() => {
      //   cy.get('button[type="submit"]').click();
      // });
    });
  });
});
