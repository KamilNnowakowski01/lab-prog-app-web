import { supabase } from "./supabaseClient";
import { User } from "../models/User";

export class UserService {
  static async getAll(): Promise<User[]> {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) throw new Error("Failed to fetch users: " + error.message);
    return data as User[];
  }

  static async getByRoles(roles: string[]): Promise<User[]> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .in("role", roles);

    if (error) throw new Error("Failed to fetch users by role: " + error.message);
    return data as User[];
  }

  static async getById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error("Failed to fetch user: " + error.message);
    return data as User;
  }
}
