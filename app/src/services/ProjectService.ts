import { Project } from "../models/Project";

export class ProjectService {
    private static STORAGE_KEY = "projects";
  
    static getProjects(): Project[] {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
  
    static saveProjects(projects: Project[]): void {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    }
  
    static addProject(project: Project): void {
      const projects = this.getProjects();
      projects.push(project);
      this.saveProjects(projects);
    }
  
    static updateProject(updatedProject: Project): void {
      let projects = this.getProjects();
      projects = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p));
      this.saveProjects(projects);
    }
  
    static deleteProject(id: string): void {
      let projects = this.getProjects().filter((p) => p.id !== id);
      this.saveProjects(projects);
    }
  }
  