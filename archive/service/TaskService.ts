// services/TaskService.ts
import { Task, Status } from "../models/Task";
import { LocalStorage } from "./LocalStorage";
import { v4 as uuidv4 } from "uuid";

export class TaskService {
  private static storage = new LocalStorage<Task>("tasks");

  static async getTasks(): Promise<Task[]> {
    return this.storage.getAll();
  }

  static async getTaskById(id: string): Promise<Task | null> {
    return this.storage.getById(id);
  }

  static async addTask(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    return this.storage.create(newTask);
  }

  static async updateTask(task: Task): Promise<Task> {
    return this.storage.update(task);
  }

  static async deleteTask(id: string): Promise<void> {
    return this.storage.delete(id);
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
