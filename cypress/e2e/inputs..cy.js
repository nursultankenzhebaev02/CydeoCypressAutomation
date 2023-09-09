/// <reference types="cypress" />

describe("Input Forms Tests", () => {
  beforeEach("Navigate to registration page", () => {
    cy.clearCookies();
    cy.visit("/registration_form");
  });

  it.skip("Check different input box fields and verify", () => {
    // Fill the form for username and other info
    cy.get('input[name="firstname"]').type("Harry");
    cy.get('input[name="lastname"]').type("Potter");
    cy.get('input[name="username"]').type("Unique");
    /**
     * Math.random(): creates a number between 0 - 1 ~ 0,05678
     * Math.floor(): makes is a whole number
     */
    const email = `formTests${Math.floor(
      100000 + Math.random() * 900000,
    )}@cydeo.com`;
    cy.get('input[name="email"]').type(email);
    const password = `tests${Math.floor(100000 + Math.random() * 900000)}`;
    cy.get('input[name="password"]').type(password);
    const phoneNumber = `267-000-${Math.floor(1000 + Math.random() * 9000)}`;
    cy.get('input[name="phone"]').type(phoneNumber);
    cy.get('input[name="birthday"]').type("08/09/1203");
  });

  it.skip("Check different radio buttons actions", () => {
    cy.get('.radio').find('[type=radio]').then((radio => {
        //Get all radion buttons, select the first one and verify that it is checked
        cy.wrap(radio).first().check().should('be.checked'); // Cypress works in a chainable functions structure
        /**
         * radio: is Jquery element, cy.wrap(radio) : turns it into Cypress Object so that I can use cypress functions
         * first() : select element
         * check() : checks it out
         * should() : verifies whatever I provide as parameter 'be.checked'
         */
        //Get all radio buttons, select the second one and verify that it si checked and confirmation label is visible
        cy.wrap(radio).eq(1).check().should('be.checked');
        cy.get('[data-bv-icon-for="gender"]').should('be.visible'); //Common function used in tests
        //Third radio button is NOT checked
        cy.wrap(radio).eq(2).should('not.be.checked');
    }))
  })

  

});
