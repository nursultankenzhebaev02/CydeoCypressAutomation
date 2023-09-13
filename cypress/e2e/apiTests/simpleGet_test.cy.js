describe('How to do API tests with cypress', () => {
    it('Simple GET request, check status header and body', () => {
        cy.request({
            //This functions takes a json object as parameter, and inside this object
            // we define core parts of HTTP request 
            method: 'GET',
            // Hardcoded url: https://demoqa.com/BookStore/v1/Books
            url: `${Cypress.env('apiUrl')}${Cypress.env('apiBooks')}`,
      // other than method and url the rest of options depend on your test case
      failOnStatusCode: false,
    }).then((response) => {
        expect(response.status).to.equal(200);
        //cy.log(response.body.books[0].isbn);
        expect(response.body.books[1].title).to.equal("Learning JavaScript Design Patterns");
        expect(response.headers.connection).to.equal('keep-alive');
        const books = response.body.books;
        //books.forEach(element => {
        //    console.log(element);
        //});

        // Loop for verification title
        let index = 0;
        cy.fixture('bookTitles').then((expectedBookTitle) => {
            for (let i = 0; i < 8; i++) {
              expect(response.body.books[i].title).to.equal(expectedBookTitle[i]);
              console.log(expectedBookTitle[i]);
            }
          });
        });
      });
    });