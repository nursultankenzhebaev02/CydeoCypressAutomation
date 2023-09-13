/// <reference types="cypress" />

describe("Input Forms Tests", () => {
  beforeEach("Navigate to registration page", () => {
    cy.clearCookies();
    cy.visit("/registration_form");
  });

  it("Check different input box fields and verify", () => {
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

  it("Check different radio buttons actions", () => {
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
  it('Check selection of a single choise from a select dropdown', () => {
    
    //Assert that dropdown is selected
    //cy.get('select[name="department"]').contains("Department of Engineering");
    //Select one element 
    cy.get('select[name="job_title"]').select("SDET");
    //Assert that dropdown has correct text after selecting
    cy.get('select[name="job_title"]').contains("SDET");
  })

  it("Check different checkboxes actions", () => {
    //Get all checkboxes, select and verify
    cy.get('[type="checkbox"]').then((checkboxes) => {
    cy.wrap(checkboxes).eq(1).check().should('be.checked');
    //Uncheck JAVA
    cy.wrap(checkboxes).eq(1).uncheck().should('not.be.checked');
    //Verify third one has a value JavaScript and then check and verify
    cy.wrap(checkboxes).eq(2).should('have.value', 'javascript').check().should('be.checked');
})

  })
  it("Check selection of all select dropdown options", () => {
    //We will provide our test data fixtures folder as JSON object, then data to verify select values
    cy.fixture('department').then((departments) => {
      //Get all options in the menu, iterate through these options one by one
    cy.get('select[name="department"] > option').each((option, index) => {
    // Get each option text
    const optionText = option.text();
    //cy.log(optionText);
    //cy.log(index);
    //cy.log(departments[index]);
    cy.get('select[name="department"]').select(optionText).should('have.value', option.val())
    .contains(departments[index]);
  })
    })
  })
  

});
