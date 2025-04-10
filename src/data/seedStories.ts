import { Story, Status } from "../models/Story";
import { StoryService } from "../services/StoryService";
import { ProjectService } from "../services/ProjectService";
import { UserService } from "../services/UserService";

// Przykładowe zadania dla każdego projektu
const projectTasks: Record<string, string[]> = {
  "1": [  // Aplikacja To-Do
    "Dodaj możliwość dodawania zadań",
    "Dodaj usuwanie zadań",
    "Dodaj edycję zadań",
    "Stwórz widok ukończonych zadań",
    "Dodaj możliwość ustawiania priorytetów"
  ],
  "2": [  // System Rezerwacji
    "Utwórz formularz rezerwacji",
    "Dodaj kalendarz dostępności",
    "Stwórz API do zarządzania rezerwacjami",
    "Dodaj powiadomienia e-mailowe",
    "Dodaj możliwość edycji rezerwacji"
  ],
  "3": [  // E-Commerce
    "Dodaj koszyk zakupów",
    "Zaimplementuj płatności online",
    "Dodaj system opinii i recenzji",
    "Stwórz stronę produktu",
    "Utwórz panel administracyjny"
  ],
  "4": [  // Chat Messenger
    "Dodaj listę kontaktów",
    "Zaimplementuj wiadomości w czasie rzeczywistym",
    "Dodaj funkcję wysyłania plików",
    "Stwórz pokoje czatu",
    "Dodaj system powiadomień"
  ],
  "5": [  // Portfolio Web
    "Stwórz stronę główną",
    "Dodaj sekcję o mnie",
    "Dodaj galerię projektów",
    "Stwórz formularz kontaktowy",
    "Dodaj blog z artykułami"
  ],
  "6": [  // Kalendarz Projektów
    "Utwórz interfejs kalendarza",
    "Dodaj możliwość dodawania wydarzeń",
    "Stwórz widok miesięczny, tygodniowy, dzienny",
    "Dodaj możliwość przypisywania zadań do dat",
    "Dodaj integrację z powiadomieniami"
  ]
};

// Funkcja generująca przykładowe historyjki dla jednego projektu
function generateStoriesForProject(projectId: string, ownerId: string): Omit<Story, "id">[] {
  const tasks = projectTasks[projectId] || [];
  return tasks.map((name, index) => ({
    name,
    description: `Opis do zadania: ${name}...`,
    projectId,
    createdAt: new Date().toISOString(),
    status: index % 3 === 0 ? Status.ToDo : index % 3 === 1 ? Status.Doing : Status.Done,
    ownerId
  }));
}

// Funkcja inicjalizująca przykładowe historyjki w localStorage
export async function seedStories() {
  const existingStories = await StoryService.getStories();
  if (existingStories.length > 0) return;

  const projects = await ProjectService.getProjects();
  const user = UserService.getUser();

  if (!user) {
    console.error("Użytkownik nie jest zalogowany. Nie można wygenerować historyjek.");
    return;
  }

  for (const project of projects) {
    const storiesForProject = generateStoriesForProject(project.id, user.id);
    for (const story of storiesForProject) {
      await StoryService.addStory(story);
    }
  }
}