/// <reference types="cypress"/>

describe('Context: My first test', () => {
    beforeEach(() => {
        //runs before each test cases, beforeMethod in TestNG
        cy.clearCookies;
        cy.visit('/login');
    })
    it('Check different strategies', () => {
        cy.get("input[name='username']").type('CydeoStudent');
        cy.get("[type='text']").clear(); //clear what is typed

        cy.get("input").each((item, index, list) => {
            //assert the legth of the list is 2
            expect(list).to.have.length(2);
            expect(item).to.attr("type");
        })

        //By attribute name
        cy.get('[type]');

        //By className
        cy.get('.btn.btn-primary');

        //By ID
        cy.get('#wooden_spoon');

        //If I want to use text: no xpath in cypress, but it still possible with a different approach
        cy.get('button').should('contain', 'Login').click();

    })
})