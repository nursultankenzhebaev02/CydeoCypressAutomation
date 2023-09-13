/// <reference types="cypress"/>

describe("Context: My first test", () => {
  before(() => {
    // runs once before all test cases in this describe block, like beforeClass in TestNG
  });
  beforeEach(() => {
    // runs before each test cases, beforeMethod in TestNG
    cy.clearCookies;
  });
  after(() => {
    // runs after all method like afterClass in TestNG
  });
  afterEach(() => {
    // runs after each method like afterMethod in TestNG
  });
  it("Opening a web application", () => {
    cy.visit("/registration_form");
  });
  it("Test 2", () => {
    expect(false).to.equal(false);
  });
  it("Test 3", () => {
    expect(false).not.to.equal(true);
  });
  it("Test 4", () => {
    expect(5).to.equal(5);
  });
  it("Test 5", () => {
    expect(true).to.equal("5" == 5);
  });
});
