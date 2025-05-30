
import users from "../data/users.json"
import projects from "../data/projects.json"
import stories from "../data/stories.json"
import tasks from "../data/tasks.json"

export async function seeds() {
  if (!localStorage.getItem("users")) {
    await localStorage.setItem("users", JSON.stringify(users));
  }

  if (!localStorage.getItem("projects")) {
    await localStorage.setItem("projects", JSON.stringify(projects));
  }

  if (!localStorage.getItem("stories")) {
    await localStorage.setItem("stories", JSON.stringify(stories));
  }

  if (!localStorage.getItem("tasks")) {
    await localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}