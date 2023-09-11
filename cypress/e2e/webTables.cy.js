/// <reference types="cypress" />

describe('Cypress WebTable Tests', { baseUrl: 'https://demoqa.com' }, () => {
  /**
   * If you need to navigate to a URL other than your baseUrl, you define it at describe block or in the it block
   */
  beforeEach('Navigate to upload page', () => {
    cy.clearCookies();
    cy.visit('/webtables');
  });

  it.skip('Check finding and editing a record', () => {
    /**
     * locate table body - then naviagte through this element to find Alden, then update info with another person
     * 1. get me table body
     * 2. get me the row that contains Alden
     * 3. store it into a jquery element
     */
    cy.get(".rt-tbody").contains(".rt-tr-group", 'Alden')
    .then((row) => {
        cy.wrap(row).find('[title="Edit"]').click();
        cy.get('#firstName').clear().type("Harvey");
        cy.get('#lastName').clear().type("Specter");
        cy.get('#submit').click();
        //From cypress test perspective we are still inside row element: need to do ASSERTION
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter');


    })

  })

  it.skip('Check finding and deleting record', () => {
    cy.get('.rt-tbody').contains('.rt-tr-group', 'Alden').then((row) => {
        //Click on Delete button for Alden record
        cy.wrap(row).find('[title="Delete"]').click();
    })
    //Assert that table does NOT have Alden record
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    //Search for Alden in the body
    cy.get('#searchBox').type('Alden');
    //Assert that there is no record
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    //No data found element is visible or not
    cy.get('.rt-noData').should('contain', 'No rows found')
    .should('be.visible');
  })
  it.skip('Check search for different age records', () => {
    //Define age groups
    const ageGroup = [29, 39, 45, 77];
    //For each age group perform same test scenario
    cy.wrap(ageGroup).each((age) => {
    cy.get('#searchBox').clear().type(age);
    //Verify if that age exists, second number of records
    if(age === 77){
        //Negative scenario
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain', age);
        cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
    }else{
        //Positive scenario
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain', age);
        cy.get('.rt-tbody').contains('.rt-tr-group', age).should('have.length', 1);
    }
    })
  })
  it.skip('Check adding a new record - Bad code practice', () => {
    // click on add button
    cy.get('#addNewRecordButton').click();
    // fill form
    cy.get('#firstName').type('Harvey');
    cy.get('#lastName').type('Specter');
    cy.get('#userEmail').type('specter@example.com');
    cy.get('#age').type('40');
    cy.get('#salary').type('70000');
    cy.get('#department').type('legal');
    cy.get('#submit').click();
    // assert that new record is added
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', 'Harvey')
      .then((row) => {
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter');
        cy.wrap(row).find('.rt-td').eq(2).should('contain', '40');
        cy.wrap(row).find('.rt-td').eq(3).should('contain', 'specter@example.com');
        cy.wrap(row).find('.rt-td').eq(4).should('contain', '70000');
        cy.wrap(row).find('.rt-td').eq(5).should('contain', 'legal');
      });
  });
  it('Check adding a new record - Better Aproach', () => {
    //Click on add button
    cy.get('#addNewRecordButton').click();
    cy.fixture('user').then((user) => {
        const colomnNames = Object.keys(user.user1); // Goes to fixture folder, gets user 1 object keys and 
        // stores into columnNames Array
        const userData = Object.values(user.user1)
        cy.wrap(colomnNames).each((columnName, index) => {
            //  cy.log(columnName);
        //  cy.log(userData[index]);
        cy.get(`#${columnName}`).type(`${userData[index]}`);
    });
    cy.get('#submit').click();
    //Assert that new record is added
    cy.get('.rt-tbody').contains('.rt-tr-group', userData[0]).then((row) => {
        cy.wrap(userData).each((value, index) => {
            cy.wrap(row).find('.rt-td').eq(index).should('contain', value);

                }) 
            })
        })
    })

})