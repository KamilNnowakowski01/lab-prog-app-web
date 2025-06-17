export class AuthService {
  private static API_URL = "http://localhost:3000/auth";

  static async login(username: string, password: string): Promise<void> {
    const res = await fetch(`${this.API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error("Nieprawidłowy login lub hasło");
    }

    const { accessToken, refreshToken } = await res.json();
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  static async refresh(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error("Brak refresh tokenu");

    const res = await fetch(`${this.API_URL}/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) throw new Error("Nie można odświeżyć tokenu");

    const { accessToken, refreshToken: newRefreshToken } = await res.json();
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  }

  static async getCurrentUser(): Promise<any> {
    const token = this.getAccessToken();
    if (!token) throw new Error("Brak access tokenu");

    const res = await fetch(`${this.API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Błąd autoryzacji");

    return await res.json();
  }

  static logout(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  static getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  static isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
