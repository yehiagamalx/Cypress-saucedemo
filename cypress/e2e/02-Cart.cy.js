/// <reference types="cypress" />

describe("testing cart scenarios", () => {
  beforeEach(() => {
    cy.fixture("usersData").as("users");
    cy.visit("/");
    cy.get(".login_logo").should("contain", "Swag Labs");
    cy.get("@users").then((users) => {
      cy.get('[data-test="username"]').type(users.standard.userName);
      cy.get('[data-test="password"]').type(users.standard.password);
    });
    cy.get('[data-test="login-button"]').click();
    cy.get(".title").should("contain", "Products");
  });

  it("Add an item to the cart", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_badge").should("exist");
  });

  it("Remove an item from the cart", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_badge").should("exist");
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_badge").should("not.exist");
  });
});
