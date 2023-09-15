describe('Spartan API tests', { baseUrl: 'http://54.226.211.37:8000/' }, () => {
  it('Get a single spartan', () => {
    cy.request('GET', 'api/spartans/100').then((response) => {
      expect(response.status).to.equal(200);
    });
  });


});