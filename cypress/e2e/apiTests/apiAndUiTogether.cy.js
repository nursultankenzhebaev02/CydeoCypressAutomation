const username = `user${Math.floor(Math.random() * 100000 + 100000)
    .toString()
    .substring(1)}`;
  const passWord = 'Test123456!';
  
  describe('E2E - Test API integrated UI Test', () => {
    beforeEach('create a user and generate token from API and set cookies', () => {
      // Following API requset is for creating user and setting cookies for the test
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}${Cypress.env('generateUser')}`,
        body: {
          userName: username,
          password: passWord,
        },
      }).then((response) => {
        cy.setCookie('userID', response.body.userID);
        cy.setCookie('userName', response.body.username);
      });
      //Following will generate token and set token cookies
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}${Cypress.env('generateToken')}`,
        body:{
            userName: username,
            password: passWord,
        }
            
      }).then((response) => {
        cy.setCookie('token', response.body.token);
        cy.setCookie('expires', response.body)
      })

    })
    afterEach('Deleting USER created for testing by using API request', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}${Cypress.env('loginAPI')}`,
            body: {
              userName: username,
              password: passWord,
            },
          }).then((response) => {
            cy.request({
                method: 'DELETE',
                headers: {
                  authorization: `Bearer ${response.body.token}`,
                },
                url: `${Cypress.env('apiUrl')}${Cypress.env('generateUser')}/${response.body.userId}`,
              });
            });
          });
        
          it('Check if user is logged in from UI environment', { baseUrl: 'https://demoqa.com' }, () => {
            cy.visit('/profile');
            cy.get('#userName-value').contains(username).should('be.visible');
        })
    })