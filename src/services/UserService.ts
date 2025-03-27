import { User } from "../models/User";

export class UserService {
  private static STORAGE_KEY_loggedInUser = "loggedInUser";

  // Pobiera użytkownika z localStorage seedUsers.ts
  static getUser(): User | null {
    const storedUser = localStorage.getItem(this.STORAGE_KEY_loggedInUser);
    return storedUser ? JSON.parse(storedUser) : null;
  }
}
