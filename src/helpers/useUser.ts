import { useEffect, useState } from "react";
import { User } from "../models/User";
import { UserService } from "../services/UserService";

export function useUser(userId?: string) {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    UserService.getById(userId)
      .then((u) => setUser(u ?? undefined))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}
