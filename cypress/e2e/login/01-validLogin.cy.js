/// <reference types="cypress" />

describe("Positive login scenario", () => {
  beforeEach(() => {
    cy.fixture("usersData").as("users");
  });

  it("Login with valid user", () => {
    cy.visit("/");
    cy.get(".login_logo").should("contain", "Swag Labs");
    cy.get("@users").then((users) => {
      cy.get('[data-test="username"]').type(users.standard.userName);
      cy.get('[data-test="password"]').type(users.standard.password);
    });
    cy.get('[data-test="login-button"]').click();
    cy.get(".title").should("contain", "Products");
  });
});
