import { User } from "../models/User";
import { supabase } from "./supabaseClient";

export class AuthSupabase {
  static async signUp(
    email: string,
    password: string,
    name: string,
    role: string = "user"
  ) {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      { email, password }
    );
    if (signUpError) throw new Error(signUpError.message);

    const userId = signUpData.user?.id;
    if (!userId) throw new Error("Brak ID użytkownika po rejestracji");

    const { error: userError } = await supabase.from("users").insert({
      idAuth: userId,
      name,
      role,
    });
    if (userError) throw new Error("Błąd zapisu profilu: " + userError.message);
  }

  static async login(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error("Nieprawidłowy login lub hasło");

    const userId = data.user?.id;
    if (!userId) throw new Error("Nieprawidłowa sesja");

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("idAuth", userId)
      .single();

    if (profileError) throw new Error("Nie znaleziono profilu użytkownika");

    return {
      ...profile,
      email: data.user?.email,
    } as User;
  }

  static async getCurrentUser(): Promise<User> {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError || !sessionData.session)
      throw new Error("Brak aktywnej sesji");

    const userId = sessionData.session.user.id;
    const userEmail = sessionData.session.user.email;

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("idAuth", userId)
      .single();

    if (profileError) throw new Error("Błąd pobierania danych użytkownika");

    return {
      ...profile,
      email: userEmail,
    } as User;
  }

  static async getAccessToken(): Promise<string | null> {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }

  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error("Błąd podczas wylogowania");
  }

  static async isLoggedIn(): Promise<boolean> {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  }
}
