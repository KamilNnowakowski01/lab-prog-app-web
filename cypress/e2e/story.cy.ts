/// <reference types="cypress" />

describe("Story", () => {
  beforeEach(() => {
    cy.session("user-session", () => {
      cy.login("admin@example.com", "admin123");
    });
  });

  before(() => {
    cy.login("admin@example.com", "admin123");
    cy.createProject(
      "Website Redesign",
      `Project involving a complete redesign of the company's website.`
    );
  });

  it("setup", () => {});
  it("create", () => {
    cy.selectProject("Website Redesign");
    cy.contains("button", "Open Stories").click();
    cy.createStory(
      "Create homepage layout",
      "Design and implement the new homepage layout for the Website Redesign project."
    );
    cy.get(".card-title").should("have.text", "Create homepage layout");
  });
  it("edit", () => {
    cy.selectProject("Website Redesign");
    cy.contains("button", "Open Stories").click();
    cy.selectStory("Create homepage layout");
    cy.contains("a", "Edite").click();
    cy.get("#formStoryName").clear().type("Edited. Create homepage layout");
    cy.get("#formStoryDescription")
      .clear()
      .type(
        "Edited. Design and implement the new homepage layout for the Website Redesign project."
      );
    cy.contains("button", "Save").click();
    cy.contains(".card-subtitle", "name")
      .next(".card-title")
      .should("have.text", "Edited. Create homepage layout");
  });
  it("edit status", () => {
    cy.selectProject("Website Redesign");
    cy.contains("button", "Open Stories").click();
    cy.selectStory("Edited. Create homepage layout");
    cy.get('.card-header a.btn-warning').contains('Edite').click();
    cy.url().should("match", /\/project\/[a-f0-9\-]+\/stories\/edit\/[a-f0-9\-]+$/);
    cy.get("#formStoryName").should("be.visible");
    cy.get("#formStoryStatus").select("Doing");
    cy.contains("button", "Save").click();
    cy.contains(".card-subtitle", "status")
      .next(".card-title")
      .should("have.text", "Doing");
    cy.get('.card-header a.btn-warning').contains('Edite').click();
    cy.url().should("match", /\/project\/[a-f0-9\-]+\/stories\/edit\/[a-f0-9\-]+$/);
    cy.get("#formStoryName").should("be.visible");
    cy.get("#formStoryStatus").select("Done");
    cy.contains("button", "Save").click();
    cy.contains(".card-subtitle", "status")
      .next(".card-title")
      .should("have.text", "Done");
    cy.get('.card-header a.btn-warning').contains('Edite').click();
    cy.url().should("match", /\/project\/[a-f0-9\-]+\/stories\/edit\/[a-f0-9\-]+$/);
    cy.get("#formStoryName").should("be.visible");
    cy.get("#formStoryStatus").select("To Do");
    cy.contains("button", "Save").click();
    cy.contains(".card-subtitle", "status")
      .next(".card-title")
      .should("have.text", "To Do");
  });
  it("delete", () => {
    cy.selectProject("Website Redesign");
    cy.contains("button", "Open Stories").click();
    cy.selectStory("Edited. Create homepage layout");
    cy.contains("a", "Delete").click();
    cy.contains("button", "Delete").click();
    cy.contains(".card-title", "Edited. Create homepage layout").should("not.exist");

  });
  it("reset", () => {
    cy.selectProject("Website Redesign");
    cy.url().should("match", /\/project\/[a-f0-9\-]+$/);
    cy.contains("button", "Delete").click();
    cy.url().should("match", /\/project\/delete\/[a-f0-9\-]+$/);
    cy.contains("button", "Delete").click();
  });
});
