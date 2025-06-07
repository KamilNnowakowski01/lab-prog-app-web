import { supabase } from "./supabaseClient";
import { Project } from "../models/Project";
import { v4 as uuidv4 } from "uuid";

export class ProjectService {
  static async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw new Error(`Błąd pobierania projektów: ${error.message}`);
    return data as Project[];
  }

  static async getProjectById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error(`Błąd pobierania projektu: ${error.message}`);
    return data as Project;
  }

  static async addProject(project: Omit<Project, "id">): Promise<Project> {
    const newProject = { ...project, id: uuidv4() };

    const { data, error } = await supabase
      .from("projects")
      .insert([newProject])
      .select()
      .single();

    if (error) throw new Error(`Błąd dodawania projektu: ${error.message}`);
    return data as Project;
  }

  static async updateProject(updatedProject: Project): Promise<Project> {
    const { data, error } = await supabase
      .from("projects")
      .update({
        name: updatedProject.name,
        description: updatedProject.description,
      })
      .eq("id", updatedProject.id)
      .select()
      .single();

    if (error) throw new Error(`Błąd aktualizacji projektu: ${error.message}`);
    return data as Project;
  }

  static async deleteProject(id: string): Promise<void> {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw new Error(`Błąd usuwania projektu: ${error.message}`);
  }
}