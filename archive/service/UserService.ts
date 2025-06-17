// services/UserService.ts
import { User } from "../models/User";
import { LocalStorage } from "./LocalStorage";

export class UserService {
  private static storage = new LocalStorage<User>("users");
  private static currentUserKey = "loggedInUser";

  static async getAllUsers(): Promise<User[]> {
    return this.storage.getAll();
  }

  static async createUser(user: Omit<User, "id">): Promise<User> {
    return this.storage.create(user);
  }

  static async loginUser(id: string): Promise<void> {
    const user = await this.storage.getById(id);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    }
  }

  static logoutUser(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  static getCurrentUser(): User | null {
    const storedUser = localStorage.getItem(this.currentUserKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }
}