/// <reference types="cypress" />

describe('Alerts in Cypress Test Environment', { baseUrl: 'https://demoqa.com' }, () => {
  beforeEach(() => {
    // run before each test case, beforeMethod in TestNG
    cy.clearCookies();
    cy.visit('/alerts');
  });

  it('Check alert cancelation', () => {
    /**
     * Browser Commands, window:alert, window:confirm, window:on etc...
     *
     *  */
    const stub = cy.stub();// Created a stub function
    cy.on('window:confirm', stub); //When this confirmation command initiated stire and give the control to stub function 
    
    cy.get('#confirmButton').click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
    })
    cy.on('window:confirm', () => false); // Cancel the alert confirmation
    cy.contains('You selected Cancel').should('be.visible');
    })
})