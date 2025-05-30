import { LocalStorage } from "./LocalStorage";
import { Story } from "../models/Story";
import { UserService } from "./UserService";

export class StoryService {
  private static storage = new LocalStorage<Story>("stories");

  static async getStories(): Promise<Story[]> {
    return this.storage.getAll();
  }

  static async getStoriesByProjectId(projectId: string): Promise<Story[]> {
    const allStories = await this.getStories();
    return allStories.filter((story) => story.projectId === projectId);
  }

  static async getStoryById(id: string): Promise<Story | null> {
    return this.storage.getById(id);
  }

  static async addStory(
    story: Omit<Story, "id" | "ownerId" | "createdAt">
  ): Promise<Story> {
    const loggedInUser = UserService.getCurrentUser();
    if (!loggedInUser) {
      throw new Error("Nie znaleziono zalogowanego użytkownika.");
    }

    const newStoryData = {
      ...story,
      ownerId: loggedInUser.id,
      createdAt: new Date().toISOString(),
    };

    return this.storage.create(newStoryData);
  }

  static async updateStory(updatedStory: Story): Promise<Story> {
    return this.storage.update(updatedStory);
  }

  static async deleteStory(id: string): Promise<void> {
    return this.storage.delete(id);
  }
}
