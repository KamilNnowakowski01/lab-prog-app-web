/// <reference types="cypress" />
describe("Story Management", () => {
  let user: { email: string; password: string };
  let project: {
    original: { name: string; description: string };
    edited: { name: string; description: string };
  };
  let story: {
    original: { name: string; description: string };
    edited: { name: string; description: string };
  };
  let task: {
    original: {
      name: string;
      description: string;
      priority: string;
      hours: string;
    };
    edited: {
      name: string;
      description: string;
      priority: string;
      hours: string;
    };
    assignee: string;
  };

  before(() => {
    cy.fixture("user").then((u) => {
      user = u;
      cy.fixture("project").then((p) => {
        project = p;
        cy.fixture("story").then((s) => {
          story = s;
          cy.fixture("task").then((t) => {
            task = t;
          });
        });
      });
    });
  });

  beforeEach(() => {
    cy.session("user-session", () => {
      cy.login(user.email, user.password);
    });
  });

  before(() => {
    cy.login(user.email, user.password);
    cy.createProject(project.original.name, project.original.description);
  });

  const navigateToStories = () => {
    cy.selectProject(project.original.name);
    cy.contains("button", "Open Stories").click();
  };

  const editStoryStatus = (status: "To Do" | "Doing" | "Done") => {
    cy.get(".card-header a.btn-warning").contains("Edit").click();
    cy.url().should(
      "match",
      /\/project\/[a-f0-9\-]+\/stories\/edit\/[a-f0-9\-]+$/
    );
    cy.get("#formStoryStatus").select(status);
    cy.contains("button", "Save").click();
    cy.contains(".card-subtitle", "status")
      .next(".card-title")
      .should("have.text", status);
  };

  it("should create a story", () => {
    navigateToStories();
    cy.createStory(story.original.name, story.original.description);
    cy.get(".card-title").should("have.text", story.original.name);
  });

  it("should edit story name and description", () => {
    navigateToStories();
    cy.selectStory(story.original.name);
    cy.contains("a", "Edit").click();

    cy.get("#formStoryName").clear().type(story.edited.name);
    cy.get("#formStoryDescription").clear().type(story.edited.description);
    cy.contains("button", "Save").click();

    cy.contains(".card-subtitle", "name")
      .next(".card-title")
      .should("have.text", story.edited.name);
  });

  it("should change story status between To Do, Doing, Done", () => {
    navigateToStories();
    cy.selectStory(story.edited.name);

    editStoryStatus("Doing");
    editStoryStatus("Done");
    editStoryStatus("To Do");
  });

  it("should delete a story", () => {
    navigateToStories();
    cy.selectStory(story.edited.name);
    cy.contains("a", "Delete").click();
    cy.contains("button", "Delete").click();

    cy.contains(".card-title", story.edited.name).should("not.exist");
  });

  after("should delete a project (cleanup)", () => {
    cy.selectProject(project.original.name);
    cy.url().should("match", /\/project\/[a-f0-9\-]+$/);
    cy.contains("button", "Delete").click();
    cy.url().should("match", /\/project\/delete\/[a-f0-9\-]+$/);
    cy.contains("button", "Delete").click();
  });
});
