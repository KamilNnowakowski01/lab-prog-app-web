// seedUsers.ts
import { User } from "../models/User";
import { UserService } from "../services/UserService";

export async function seedUsers() {
  const existingUsers = await UserService.getAllUsers();
  if (existingUsers.length > 0) return;

  const adminUser = await UserService.createUser({
    name: "Jan Kowalski (Admin)",
    role: "admin"
  });

  await UserService.createUser({
    name: "Anna Nowak (Developer)",
    role: "developer"
  });

  await UserService.createUser({
    name: "Piotr Wiśniewski (DevOps)",
    role: "devops"
  });

  await UserService.loginUser(adminUser.id);
  console.log("Zalogowano admina:", adminUser.name);
}