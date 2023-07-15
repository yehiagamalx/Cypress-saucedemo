/// <reference types="cypress" />

describe("testing checkout scenario", () => {
  beforeEach(() => {
    cy.fixture("usersData").as("users");
    cy.visit("/");
    cy.get(".login_logo").should("contain", "Swag Labs");
    cy.get("@users").then((users) => {
      cy.get('[data-test="username"]').type(users.standard.userName);
      cy.get('[data-test="password"]').type(users.standard.password);
    });
    cy.get('[data-test="login-button"]').click();
    cy.location("pathname").should("equal", "/inventory.html");
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_badge").should("exist");
  });

  it("Checkout process", () => {
    cy.get(".shopping_cart_badge").click();
    cy.get('[data-test="checkout"]').click();
    cy.get("@users").then((users) => {
      cy.get('[data-test="firstName"]').type(users.billing.firstName);
      cy.get('[data-test="lastName"]').type(users.billing.lastName);
      cy.get('[data-test="postalCode"]').type(users.billing.postal);
    });
    cy.get('[data-test="continue"]').click();
    cy.get(".summary_total_label").should("be.visible");
    cy.get('[data-test="finish"]').click();
    cy.get(".complete-header").should("contain", "Thank you for your order!");
  });
});
