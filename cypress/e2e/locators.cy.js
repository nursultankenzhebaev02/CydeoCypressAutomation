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

        it('Check finding elements by travelling through DOM', () => {
            //Travel to find the login button: Locate username box - go to parent form -then find button
            cy.get('input[name="username"]').parents('form').find('button').should('contain', 'Login').click();
        })

        it.only('Check Different Type of Assertions', () => {
            //Cypress itself bundles assertions provided by Chai, Sinon and JQuery libraries
            //Should Assertions: does the assertion directly on the object itself
            cy.get('#wooden_spoon').should('contain', 'Login').and('have.class', 'btn btn-primary')
            //expected result: 
            cy.get('#wooden_spoon').then((buttonElement) => {
                expect(buttonElement).to.have.text('Login');
                expect(buttonElement).to.have.class('btn btn-primary');
            })
        })

})