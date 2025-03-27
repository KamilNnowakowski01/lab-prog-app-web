import { User } from "../models/User";
import { v4 as uuidv4 } from "uuid";

// Funkcja inicjalizująca użytkownika
export function seedUser() {
  const storedUser = localStorage.getItem("loggedInUser");

  if (!storedUser) {
    const newUser: User = {
      id: uuidv4(),  // Generowanie unikalnego ID
      name: "Jan Kowalski"
    };
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
  }
}