/// <reference types="cypress"/>

describe('Context: My first test', () => {
    beforeEach(() => {
        cy.clearCookies;
        cy.visit('/multiple_buttons');
    })
    
    it('Check Different Button Actions', () => {
        cy.contains('Button 2').should('be.visible').click();
        cy.contains('Clicked on button two!').should('be.visible');

        // Find element with class attribute and create a list then select 3rd element from the list
        cy.get('.btn.btn-primary').then(($buttons) => {
            cy.wrap($buttons).eq(2).click();
            //Assert the text
            cy.contains('Clicked on button three!').should('be.visible');
        })
    })
})