/// <reference types="cypress" />
describe("Project Management", () => {
  let user: { email: string; password: string };
  let project: {
    original: { name: string; description: string };
    edited: { name: string; description: string };
  };

  before(() => {
    cy.fixture("user").then((u) => {
      user = u;
      cy.fixture("project").then((p) => {
        project = p;
      });
    });
  });

  beforeEach(() => {
    // Upewnij się, że user jest załadowany zanim sesja się utworzy
    cy.wrap(null).then(() => {
      expect(user).to.exist;
      expect(user.email).to.exist;
      cy.session("user-session", () => {
        cy.login(user.email, user.password);
      });
    });
  });

  it("should create a project", () => {
    cy.createProject(project.original.name, project.original.description);
  });

  it("should edit a project", () => {
    cy.selectProject(project.original.name);
    cy.contains("button", "Edit").click();
    cy.contains("Edit Project").should("exist");

    cy.get("#formProjectName").clear().type(project.edited.name);
    cy.get("#formProjectDescription").clear().type(project.edited.description);
    cy.contains("button", "Save").click();

    cy.url().should("match", /\/project\/[a-f0-9\-]+$/);
    cy.contains(".card", project.edited.name).within(() => {
      cy.get(".card-title").should("have.text", project.edited.name);
    });
  });

  it("should delete a project", () => {
    cy.selectProject(project.edited.name);
    cy.url().should("match", /\/project\/[a-f0-9\-]+$/);
    cy.get(".card-title").should("have.text", project.edited.name);

    cy.contains("button", "Delete").click();
    cy.url().should("match", /\/project\/delete\/[a-f0-9\-]+$/);
    cy.contains("Delete Project").should("exist");
    cy.get(".alert strong").should("have.text", project.edited.name);

    cy.contains("button", "Delete").click();
    cy.url().should("match", /\/project\//);
    cy.get(".card").should("not.contain.text", project.edited.name);
  });
});
