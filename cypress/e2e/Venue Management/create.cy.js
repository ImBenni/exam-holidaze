describe("Create Venue", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/profile");
  });

  it("should create a new venue", () => {
    cy.get('[data-testid="createVenueButton"]').click()
    cy.url().should("include", "/venues/create");

    cy.get('input[name="name"]').type("frog");
    cy.get('textarea[name="description"]').type("watch out dawg, this jit aint trippin");
    cy.get('input[name="price"]').type("72");
    cy.get('input[name="maxGuests"]').type("6");

    cy.get('input[id="media0"]').type("https://media.istockphoto.com/id/1343709768/photo/the-toad-wearing-the-hat.jpg?s=612x612&w=0&k=20&c=kZ5fo-r_PRsS6Ou3H7vKluRlsZLFYd_6V4Gbgx7SJIk=");
    cy.contains("Add Image").click();
    cy.get('input[id="media1"]').type("https://media.istockphoto.com/id/1343709766/photo/the-toad-wearing-the-hat.jpg?s=612x612&w=0&k=20&c=ieHVBxgtl5mLRpBqEDU1TAh7NRmkfzAmVJk2IZysQ7Y=");

    cy.get('input[name="venue-rating"][value="4"]').click({ force: true });

    cy.get('input[name="wifi"]').check();
    cy.get('input[name="parking"]').check();
    cy.get('input[name="breakfast"]').check();
    cy.get('input[name="pets"]').check();


    cy.get('input[name="city"]').type("Backyard");
    cy.get('input[name="address"]').type("Tiny Pond 23");
    cy.get('input[name="country"]').type("Norway");
    cy.get('input[name="continent"]').type("Europe");


    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/profile");
    cy.contains("Venues Created").click();
    
    cy.get(".MuiGrid-root .MuiCard-root")
    .first()
    .within(() => {
      cy.get("a[name='openVenue']").click();
    });
  });
});
