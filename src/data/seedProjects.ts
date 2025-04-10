import { Project } from "../models/Project";
import { ProjectService } from "../services/ProjectService";

// Przykładowe projekty (bez ID - będzie generowane automatycznie)
const sampleProjects: Omit<Project, "id">[] = [
  { name: "Aplikacja To-Do", description: "Lista zadań z funkcją oznaczania jako wykonane." },
  { name: "System Rezerwacji", description: "Aplikacja do rezerwacji spotkań i wydarzeń." },
  { name: "E-Commerce", description: "Sklep internetowy z koszykiem i płatnościami." },
  { name: "Chat Messenger", description: "Aplikacja do czatu w czasie rzeczywistym." },
  { name: "Portfolio Web", description: "Strona internetowa dla freelancerów." },
  { name: "Kalendarz Projektów", description: "Interaktywny kalendarz do zarządzania projektami." }
];

// Funkcja inicjalizująca dane w localStorage
export async function seedProjects() {
  const existingProjects = await ProjectService.getProjects();
  if (existingProjects.length === 0) {
    // Używamy addProject dla każdego projektu zamiast saveProjects
    for (const project of sampleProjects) {
      await ProjectService.addProject(project);
    }
  }
}