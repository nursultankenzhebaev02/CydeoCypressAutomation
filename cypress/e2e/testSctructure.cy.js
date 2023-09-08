/// <reference types="cypress"/>

describe('Context: My first test', () => {
    before(() => {
        //runs once before all test cases in this describe block, like beforeClass in TestNG
    })
    beforeEach(() => {
        //runs before each test cases, beforeMethod in TestNG
        cy.clearCookies;
    })
    after(() => {
        //runs after all method like afterClass in TestNG
    })
    afterEach(() => {
        //runs after each method like afterMethod in TestNG
    })
    it('Opening a web application', () => {
        cy.visit('/registration_form');
    })
})