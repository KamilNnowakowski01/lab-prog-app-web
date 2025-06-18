/// <reference types="cypress" />
describe("Task", () => {
  beforeEach(() => {
    cy.session("auth-session", () => {
      cy.login("admin@example.com", "admin123");
    });
  });

  before(() => {
    cy.login("admin@example.com", "admin123");
    cy.createProject(
      "Website Redesign",
      `Project involving a complete redesign of the company's website.`
    );
    cy.selectProject("Website Redesign");
    cy.contains("button", "Open Stories").click();
    cy.contains("a", "New Story").click();
    cy.get("#formStoryName").type("Create homepage layout");
    cy.get("#formStoryDescription").type(
      "Design and implement the new homepage layout for the Website Redesign project."
    );
    cy.contains("button", "Create").click();
    cy.get(".card-title").should("have.text", "Create homepage layout");
  });

  it("setup before testing", () => {
    cy.log("Preparing data for all tests – executed before suite starts.");
  });

  it("should create a new task", () => {
    cy.selectProject("Website Redesign");
    cy.contains("button", "Open Stories").click();
    cy.selectStory("Create homepage layout");
    cy.contains("a", "Open Tasks").click();
    cy.contains("a", "New Task").click();

    cy.get("#formTaskName").type("Implement Hero Section");
    cy.get("#formTaskDescription").type(
      `Design and implement a hero section on the home page that includes a larger background graphic.`
    );
    cy.get("#formTaskPriority").select("low");
    cy.get("#formEstimatedHours").type("5");
    cy.contains("button", "Create").click();
    cy.get(".card-title").should("have.text", "Implement Hero Section");
  });

  it("should edit a task", () => {
    cy.selectProject("Website Redesign");
    cy.contains("button", "Open Stories").click();
    cy.selectStory("Create homepage layout");
    cy.contains("a", "Open Tasks").click();
    cy.contains(".card", "Implement Hero Section").within(() => {
      cy.contains("a", "Details Task").click();
    });
    cy.contains("a", "Edite").click();
    cy.get("#formTaskName").clear().type("Edited. Implement Hero Section");
    cy.get("#formTaskDescription")
      .clear()
      .type(
        `Edited. Design and implement a hero section on the home page that includes a larger background graphic.`
      );
    cy.get("#formTaskPriority").select("high");
    cy.get("#formEstimatedHours").type("8{leftarrow}{backspace}");
    cy.contains("button", "Save").click();

    cy.get(".card-title").should(
      "contain.text",
      "Edited. Implement Hero Section"
    );
    cy.get(".card-text").should(
      "contain.text",
      "Edited. Design and implement a hero section"
    );
    cy.contains("strong", "Priority:")
      .parent()
      .should("contain.text", "🔴 High");
    cy.contains("strong", "Estimated Hours:")
      .parent()
      .should("contain.text", "8 h");
  });

  it("should edit by assigning a task", () => {
    cy.selectProject("Website Redesign");
    cy.contains("button", "Open Stories").click();
    cy.selectStory("Create homepage layout");
    cy.contains("a", "Open Tasks").click();
    cy.contains(".card", "Edited. Implement Hero Section").within(() => {
      cy.contains("a", "Details Task").click();
    });
    cy.contains("a", "Assign").click();
    cy.get("#formAssignedUser").select("Marek Wiśniewski (devops)");
    cy.contains("button", "Assign").click();

    cy.contains("div", "assigned user")
      .next("p.card-text")
      .should("contain.text", "Marek Wiśniewski (devops)");

    cy.contains("div", "start date")
      .next("p.card-text")
      .invoke("text")
      .should((text) => {
        expect(text.trim()).to.not.be.empty;
      });
  });

  it("should edit a task by marking it as done", () => {
    cy.selectProject("Website Redesign");
    cy.contains("button", "Open Stories").click();
    cy.selectStory("Create homepage layout");
    cy.contains("a", "Open Tasks").click();
    cy.contains(".card", "Edited. Implement Hero Section").within(() => {
      cy.contains("a", "Details Task").click();
    });
    cy.contains("a", "Mark as Done").click();
    cy.contains("button", "Mark as Done").click();
    cy.contains("div", "end date")
      .next("p.card-text")
      .invoke("text")
      .should((text) => {
        expect(text.trim()).to.not.be.empty;
      });
  });

  it("should delete a task", () => {
    cy.selectProject("Website Redesign");
    cy.contains("button", "Open Stories").click();
    cy.selectStory("Create homepage layout");
    cy.contains("a", "Open Tasks").click();
    cy.contains("Tasks List").should("exist");
    cy.contains(".card", "Edited. Implement Hero Section").within(() => {
      cy.contains("a", "Details Task").click();
    });
    cy.contains("a", "Delete").click();
    cy.contains("button", "Delete").click();
    cy.wait(10000)
    cy.contains('.card', 'Edited. Implement Hero Section').should('not.exist');
  });

  it("reset environment after tests", () => {
    cy.log("Cleaning up after all tests – executed after suite finishes.");
  })

  after(() => {
    cy.selectProject("Website Redesign");
    cy.url().should("match", /\/project\/[a-f0-9\-]+$/);
    cy.contains("button", "Delete").click();
    cy.url().should("match", /\/project\/delete\/[a-f0-9\-]+$/);
    cy.contains("button", "Delete").click();
  });
});
