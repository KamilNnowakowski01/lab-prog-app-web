import { Story } from "../models/Story";
import { UserService } from "./UserService";  // ✅ Importowanie UserService
import { v4 as uuidv4 } from "uuid";

export class StoryService {
  private static STORAGE_KEY = "stories";

  static getStories(): Story[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveStories(stories: Story[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stories));
  }

  static addStory(story: Omit<Story, "id" | "ownerId" | "createdAt">): void {
    const stories = this.getStories();
    const loggedInUser = UserService.getUser();

    if (!loggedInUser) {
      throw new Error("Nie znaleziono zalogowanego użytkownika.");
    }

    const newStory: Story = {
      ...story,
      id: uuidv4(),
      ownerId: loggedInUser.id,
      createdAt: new Date().toISOString()
    };
    stories.push(newStory);
    this.saveStories(stories);
  }

  static updateStory(updatedStory: Story): void {
    const stories = this.getStories().map((s) => s.id === updatedStory.id ? updatedStory : s);
    this.saveStories(stories);
  }

  static deleteStory(id: string): void {
    const stories = this.getStories().filter((s) => s.id !== id);
    this.saveStories(stories);
  }
}
