class Auth {
    // difference than java, class name does not have to be same with file name
    // you can put more than one class in a file, and none of them have any superiority over each other.
    login(user_name, password) {
      cy.get('[name="username"]').type(user_name);
      cy.get('[name="password"]').type(password);
      cy.get('#wooden_spoon').click();
    }
  
    logout() {
      cy.contains('Logout').should('be.visible').click();
    }
  }
  
  const auth = new Auth(); // object of the class we made

  class Locators { //We can create another class here, how do we apply findBy annotation 
    // of Selenium with Cypress

    get userName(){ // Username is the webElement variable name
        return cy.get('[name="username"]', {timeout: 10000}); //Defining custom timeout for a specific element
    }

    get password(){
        return cy.get('[name="password"]', {timeout: 10000});
    }
    get submit() {
        return cy.get('#wooden_spoon');
      }
    }
    
    const locators = new Locators();
    
    module.exports = {
      auth,
      locators,
    
  };

 