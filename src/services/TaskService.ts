import { Task, Status } from "../models/Task";
import { supabase } from "./supabaseClient";
import { v4 as uuidv4 } from "uuid";

export class TaskService {
  static async getTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) throw new Error("Błąd pobierania tasks: " + error.message);
    return data as Task[];
  }

  static async getTasksByStoryId(storyId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("storyId", storyId)
      .order("createdAt", { ascending: false });

    if (error) throw new Error("Błąd filtrowania tasks: " + error.message);
    return data as Task[];
  }

  static async getTaskById(id: string): Promise<Task | null> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error("Błąd pobierania task: " + error.message);
    return data as Task;
  }

  static async addTask(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("tasks")
      .insert([newTask])
      .select()
      .single();

    if (error) throw new Error("Błąd dodawania taska: " + error.message);
    return data as Task;
  }

  static async updateTask(task: Task): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        name: task.name,
        description: task.description,
        priority: task.priority,
        status: task.status,
        assignedUserId: task.assignedUserId,
        startDate: task.startDate,
        endDate: task.endDate,
        estimatedHours: task.estimatedHours,
      })
      .eq("id", task.id)
      .select()
      .single();

    if (error) throw new Error("Błąd aktualizacji taska: " + error.message);
    return data as Task;
  }

  static async deleteTask(id: string): Promise<void> {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) throw new Error("Błąd usuwania taska: " + error.message);
  }

  static async assignUser(taskId: string, userId: string): Promise<Task | null> {
    const task = await this.getTaskById(taskId);
    if (!task) return null;

    task.assignedUserId = userId;
    task.status = Status.Doing;
    task.startDate = new Date().toISOString();

    return this.updateTask(task);
  }

  static async markDone(taskId: string): Promise<Task | null> {
    const task = await this.getTaskById(taskId);
    if (!task) return null;

    task.status = Status.Done;
    task.endDate = new Date().toISOString();

    return this.updateTask(task);
  }
}
