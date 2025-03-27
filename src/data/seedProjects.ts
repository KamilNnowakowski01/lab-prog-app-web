import { Project } from "../models/Project";
import { ProjectService } from "../services/ProjectService";

// Przykładowe projekty
const sampleProjects: Project[] = [
  { id: "1", name: "Aplikacja To-Do", description: "Lista zadań z funkcją oznaczania jako wykonane." },
  { id: "2", name: "System Rezerwacji", description: "Aplikacja do rezerwacji spotkań i wydarzeń." },
  { id: "3", name: "E-Commerce", description: "Sklep internetowy z koszykiem i płatnościami." },
  { id: "4", name: "Chat Messenger", description: "Aplikacja do czatu w czasie rzeczywistym." },
  { id: "5", name: "Portfolio Web", description: "Strona internetowa dla freelancerów." },
  { id: "6", name: "Kalendarz Projektów", description: "Interaktywny kalendarz do zarządzania projektami." }
];

// Funkcja inicjalizująca dane w localStorage
export function seedProjects() {
  const existingProjects = ProjectService.getProjects();
  if (existingProjects.length === 0) {
    ProjectService.saveProjects(sampleProjects);
  }
}
