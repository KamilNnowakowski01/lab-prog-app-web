/// <reference types="cypress" />
describe("Task Management", () => {
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
    // Poczekaj, aż user jest załadowany, zanim utworzysz sesję
    cy.wrap(null).then(() => {
      expect(user).to.exist;
      expect(user.email).to.exist;
      cy.session("auth-session", () => {
        cy.login(user.email, user.password);
      });
    });
  });

  before(() => {
    cy.login(user.email, user.password);

    cy.createProject(project.original.name, project.original.description);
    cy.selectProject(project.original.name);
    cy.contains("button", "Open Stories").click();

    cy.createStory(story.original.name, story.original.description);
    cy.get(".card-title").should("have.text", story.original.name);
  });

  /*
  const openTaskDetails = (taskName: string) => {
    cy.contains(".card", taskName).within(() => {
      cy.contains("a", "Details Task").click();
    });
  };
  */

  it("should create a new task", () => {
    cy.navigateToTaskList(project.original.name, story.original.name);
    cy.contains("a", "New Task").click();

    cy.get("#formTaskName").type(task.original.name);
    cy.get("#formTaskDescription").type(task.original.description);
    cy.get("#formTaskPriority").select(task.original.priority);
    cy.get("#formEstimatedHours").type(task.original.hours);

    cy.contains("button", "Create").click();
    cy.get(".card-title").should("have.text", task.original.name);
  });

  it("should edit a task", () => {
    cy.navigateToTaskList(project.original.name, story.original.name);
    cy.selectTask(task.original.name);

    cy.contains("a", "Edit").click();
    cy.get("#formTaskName").clear().type(task.edited.name);
    cy.get("#formTaskDescription").clear().type(task.edited.description);
    cy.get("#formTaskPriority").select(task.edited.priority);
    cy.get("#formEstimatedHours").type("{selectall}").type(task.edited.hours);
    cy.contains("button", "Save").click();

    cy.get(".card-title").should("contain.text", task.edited.name);
    cy.get(".card-text").should("contain.text", task.edited.description);
    cy.contains("strong", "Priority:")
      .parent()
      .should(
        "contain.text",
        task.edited.priority === "high" ? "🔴 High" : task.edited.priority
      );
    cy.contains("strong", "Estimated Hours:")
      .parent()
      .should("contain.text", `${task.edited.hours} h`);
  });

  it("should assign a user to a task", () => {
    cy.navigateToTaskList(project.original.name, story.original.name);
    cy.selectTask(task.edited.name);

    cy.contains("a", "Assign").click();
    cy.get("#formAssignedUser").select(task.assignee);
    cy.contains("button", "Assign").click();

    cy.contains("div", "assigned user")
      .next("p.card-text")
      .should("contain.text", task.assignee);

    cy.contains("div", "start date")
      .next("p.card-text")
      .invoke("text")
      .should("not.be.empty");
  });

  it("should mark a task as done", () => {
    cy.navigateToTaskList(project.original.name, story.original.name);
    cy.selectTask(task.edited.name);

    cy.contains("a", "Mark as Done").click();
    cy.contains("button", "Mark as Done").click();

    cy.contains("div", "end date")
      .next("p.card-text")
      .invoke("text")
      .should("not.be.empty");
  });

  it("should delete a task", () => {
    cy.navigateToTaskList(project.original.name, story.original.name);
    cy.contains("Tasks List").should("exist");
    cy.selectTask(task.edited.name);

    cy.contains("a", "Delete").click();
    cy.contains("button", "Delete").click();
    cy.contains(".card", task.edited.name).should("not.exist");
  });

  after(() => {
    cy.selectProject(project.original.name);
    cy.contains("button", "Delete").click();
    cy.url().should("match", /\/project\/delete\/[a-f0-9\-]+$/);
    cy.contains("button", "Delete").click();
  });
});
