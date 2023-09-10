/// <reference types="cypress" />

describe('Cypress File Upload Tests', () => {
    /**
     * Step 1:
     * In order to upload files in Cypress we need to install plugin
     * we will run following command:
     * npm install -dev cypress-file-upload
     * Step 2:
     * we need to import necessary command to our project
     * in our support folder we have commands.js file: this file is a good place for putting our utility methods (functions)
     * add following line:
     * import 'cypress-file-upload';
     * Step 3:
     * The file that you want to upload should be in your fixture folder
     */
    beforeEach('Navigate to upload page', () => {
      cy.clearCookies();
      cy.visit('/upload');
    });

    it('Check upload Action', () => {
        //We need locator to choose file button
        cy.get('input#file-upload').attachFile('pic.png');
        //Click on Upload button
        cy.get('input[id="file-submit"]').click();
        //Assert that path message is displayed
        cy.get('div[id="content"]').contains('File Uploaded!');
    })

})