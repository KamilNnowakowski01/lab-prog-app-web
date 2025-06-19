/// <reference types="cypress" />
describe("Auth Management", () => {
  it("should login and logout user as Admin.", () => {
    cy.login("admin@example.com", "admin123");
    cy.checkUserRole("admin");
    cy.contains("Welcome to ManagMe");
    cy.logout();
  });

  it("should login and logout user as DevOps.", () => {
    cy.login("marek@example.com", "haslo123");
    cy.checkUserRole("devops");
    cy.contains("Welcome to ManagMe");
    cy.logout();
  });

  it("should login and logout user as Developer.", () => {
    cy.login("annan@example.com", "haslo123");
    cy.checkUserRole("developer");
    cy.contains("Welcome to ManagMe");
    cy.logout();
  });

  it("should redirects to login if not authenticated.", () => {
    cy.visit("/");
    cy.contains("Welcome to ManagMe");
    cy.visit("/project");
    cy.url().should("include", "/login");
  });
});
