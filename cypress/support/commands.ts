/// <reference types="cypress" />

// ===== commands.ts (refactored) =====

// Utility selectors for reuse
const selectors = {
  emailInput: 'input[type="email"]',
  passwordInput: 'input[type="password"]',
  submitButton: 'button[type="submit"]',
  logoutButton: "button:contains('LogOut')",
  loginLink: "a[href='/login']",
  formProjectName: "#formProjectName",
  formProjectDescription: "#formProjectDescription",
  formStoryName: "#formStoryName",
  formStoryDescription: "#formStoryDescription",
  card: ".card",
  cardTitle: ".card-title",
  accountDropdown: "#account-dropdown",
};

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login")
    .get(selectors.emailInput)
    .type(email)
    .get(selectors.passwordInput)
    .type(password)
    .get(selectors.submitButton)
    .click();

  cy.url().should("include", "/").and("not.include", "/login");
  cy.window().should((win) => {
    const user = win.localStorage.getItem("loggedInUser");
    expect(user, "loggedInUser should be set").to.not.be.null;
  });
});

Cypress.Commands.add("logout", () => {
  cy.get(selectors.accountDropdown).should("be.visible").click();
  cy.contains("button", "LogOut").should("be.visible").click();
  cy.get(selectors.loginLink).should("be.visible");
});

Cypress.Commands.add("createProject", (name: string, description: string) => {
  cy.visit("/project/add")
    .contains("Create New Project")
    .should("exist")
    .get(selectors.formProjectName)
    .type(name)
    .get(selectors.formProjectDescription)
    .type(description);
  cy.url().should("include", "/project");
  cy.contains("button", "Create").click();

  cy.contains(name).should("exist");
});

Cypress.Commands.add("selectProject", (name: string) => {
  cy.visit("/project");
  cy.contains(selectors.card, name).within(() => {
    cy.contains("a", "Details Project").click();
  });
  cy.url().should("match", /\/project\/[a-f0-9\-]+$/);
  cy.get(selectors.cardTitle).should("have.text", name);
});

Cypress.Commands.add("createStory", (name: string, description: string) => {
  cy.url().should("match", /\/project\/[a-f0-9\-]+\/stories$/);
  cy.contains("a", "New Story").click();
  cy.get(selectors.formStoryName).type(name);
  cy.get(selectors.formStoryDescription).type(description);
  cy.contains("button", "Create").click();
  cy.get(selectors.cardTitle).should("have.text", name);
});

Cypress.Commands.add("selectStory", (name: string) => {
  cy.url().should("match", /\/project\/[a-f0-9\-]+\/stories\/?$/);
  cy.contains(selectors.card, name).within(() => {
    cy.contains("a", "Details Story").click();
  });
  cy.url().should("match", /\/project\/[a-f0-9\-]+\/stories\/[a-f0-9\-]+\/?$/);
  cy.get(".card-body")
    .contains("div", /^name$/i)
    .next()
    .should("have.class", "card-title")
    .should("have.text", name);
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      createProject(name: string, description: string): Chainable<void>;
      selectProject(name: string): Chainable<void>;
      createStory(name: string, description: string): Chainable<void>;
      selectStory(name: string): Chainable<void>;
    }
  }
}

export {};
