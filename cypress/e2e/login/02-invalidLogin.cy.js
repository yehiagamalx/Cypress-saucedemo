/// <reference types="cypress" />

describe("Negative login scenario", () => {
  beforeEach(() => {
    cy.fixture("usersData").as("users");
  });

  it("Login with valid user", () => {
    cy.visit("/");
    cy.get(".login_logo").should("contain", "Swag Labs");
    cy.get("@users").then((users) => {
      cy.get('[data-test="username"]').type(users.locked.userName);
      cy.get('[data-test="password"]').type(users.standard.password);
    });
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should("contain", "Epic sadface");
  });
});
