/// <reference types="cypress" />

describe('Input Forms Tests', () => {
    beforeEach('Navigate to registration page', () => {
      cy.clearCookies();
      cy.visit('/registration_form');
    });

    it('Check different input box fields and verify', () =>  {
        //Fill the form for username and other info
        cy.get('input[name="firstname"]').type('Harry');
        cy.get('input[name="lastname"]').type("Potter");
        cy.get('input[name="username"]').type("Unique");
        /**
         * Math.random(): creates a number between 0 - 1 ~ 0,05678
         * Math.floor(): makes is a whole number
         */
        let email = `formTests${Math.floor(100000+Math.random()*900000)}@cydeo.com`
        cy.get('input[name="email"]').type(email);
    })

})