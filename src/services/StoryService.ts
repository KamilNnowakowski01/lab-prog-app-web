import { supabase } from "./supabaseClient";
import { Story } from "../models/Story";
import { UserService } from "./UserService";
import { v4 as uuidv4 } from "uuid";

export class StoryService {
  static async getStories(): Promise<Story[]> {
    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) throw new Error("Błąd pobierania stories: " + error.message);
    return data as Story[];
  }

  static async getStoriesByProjectId(projectId: string): Promise<Story[]> {
    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .eq("projectId", projectId)
      .order("createdAt", { ascending: false });

    if (error) throw new Error("Błąd filtrowania stories: " + error.message);
    return data as Story[];
  }

  static async getStoryById(id: string): Promise<Story | null> {
    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error("Błąd pobierania story: " + error.message);
    return data as Story;
  }

  static async addStory(
    story: Omit<Story, "id" | "ownerId" | "createdAt">
  ): Promise<Story> {
    const loggedInUser = UserService.getCurrentUser();
    if (!loggedInUser) {
      throw new Error("Nie znaleziono zalogowanego użytkownika.");
    }

    const newStory = {
      id: uuidv4(),
      ...story,
      ownerId: loggedInUser.id,
      createdAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("stories")
      .insert([newStory])
      .select()
      .single();

    if (error) throw new Error("Błąd dodawania story: " + error.message);
    return data as Story;
  }

  static async updateStory(updatedStory: Story): Promise<Story> {
    const { data, error } = await supabase
      .from("stories")
      .update({
        name: updatedStory.name,
        description: updatedStory.description,
        status: updatedStory.status,
      })
      .eq("id", updatedStory.id)
      .select()
      .single();

    if (error) throw new Error("Błąd aktualizacji story: " + error.message);
    return data as Story;
  }

  static async deleteStory(id: string): Promise<void> {
    const { error } = await supabase
      .from("stories")
      .delete()
      .eq("id", id);

    if (error) throw new Error("Błąd usuwania story: " + error.message);
  }
}
