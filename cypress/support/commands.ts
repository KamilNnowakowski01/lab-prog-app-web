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

Cypress.Commands.add("checkUserRole", (expectedRole: string) => {
  cy.get(selectors.accountDropdown).should("be.visible").click();

  cy.get(".dropdown-menu .dropdown-item-text")
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      const role = text.replace("Role: ", "").trim();
      expect(role).to.equal(expectedRole);
    });

  cy.get(selectors.accountDropdown).click(); // Zamknij dropdown po sprawdzeniu
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

Cypress.Commands.add(
  "navigateToTaskList",
  (nameProject: string, nameStory: string) => {
    cy.selectProject(nameProject);
    cy.contains("button", "Open Stories").click();
    cy.selectStory(nameStory);
    cy.contains("a", "Open Tasks").click();
  }
);

Cypress.Commands.add("selectTask", (name: string) => {
  cy.contains(".card", name).within(() => {
    cy.contains("a", "Details Task").click();
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      checkUserRole(expectedRole: string): Chainable<void>;
      logout(): Chainable<void>;
      createProject(name: string, description: string): Chainable<void>;
      selectProject(name: string): Chainable<void>;
      createStory(name: string, description: string): Chainable<void>;
      selectStory(name: string): Chainable<void>;
      selectTask(name: string): Chainable<void>;
      navigateToTaskList(
        nameProject: string,
        nameStory: string
      ): Chainable<void>;
    }
  }
}

export {};
