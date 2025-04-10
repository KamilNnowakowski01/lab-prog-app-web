import { LocalStorage } from "../services/LocalStorage";
import { Project } from "../models/Project";

export class ProjectService {
  private static storage = new LocalStorage<Project>("projects");

  static async getProjects(): Promise<Project[]> {
    return this.storage.getAll();
  }

  static async getProjectById(id: string): Promise<Project | null> {
    return this.storage.getById(id);
  }

  static async addProject(project: Omit<Project, "id">): Promise<Project> {
    return this.storage.create(project);
  }

  static async updateProject(updatedProject: Project): Promise<Project> {
    return this.storage.update(updatedProject);
  }

  static async deleteProject(id: string): Promise<void> {
    return this.storage.delete(id);
  }

  // Specjalna metoda tylko do seedowania danych
  static async saveProjects(projects: Project[]): Promise<void> {
    localStorage.setItem("projects", JSON.stringify(projects));
  }
}