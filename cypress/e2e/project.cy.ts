/// <reference types="cypress" />
describe("Project", () => {
  beforeEach(() => {
    cy.session("user-session", () => {
      cy.login("admin@example.com", "admin123");
    });
  });

  it("setup", () => {});
  it("create", () => {
    cy.createProject(
      "Website Redesign",
      `Project involving a complete redesign of the company's website.`
    );
  });
  it("edite", () => {
    cy.selectProject("Website Redesign");
    cy.contains("button", "Edite").click();
    cy.contains("Edit Project").should("exist");
    cy.get("#formProjectName").clear().type("Edited Website Redesign");
    cy.get("#formProjectDescription")
      .clear()
      .type(
        `Edited. Project involving a complete redesign of the company's website.`
      );
    cy.contains("button", "Save").click();
    cy.url().should("match", /\/project\/[a-f0-9\-]+$/);
    cy.contains(".card", "Edited Website Redesign").within(() => {
      cy.get(".card-title").should("have.text", "Edited Website Redesign");
    });
  });
  it("delete", () => {
    cy.selectProject("Edited Website Redesign");
    cy.url().should("match", /\/project\/[a-f0-9\-]+$/);
    cy.get(".card-title").should("have.text", "Edited Website Redesign");
    cy.contains("button", "Delete").click();
    cy.url().should("match", /\/project\/delete\/[a-f0-9\-]+$/);
    cy.contains("Delete Project").should("exist");
    cy.get(".alert strong").should("have.text", "Edited Website Redesign");
    cy.contains("button", "Delete").click();
    cy.url().should("match", /\/project\//);
    cy.get(".card").should("not.contain.text", "Edited Website Redesign");
  });
  it("reset", () => {});
});
