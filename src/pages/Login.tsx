import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthService } from "../services/AuthService";
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await AuthService.login(username, password);
      const currentUser = await AuthService.getCurrentUser();
      login(currentUser); // <- aktualizacja store

      setUsername("");
      setPassword("");
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Błąd logowania");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card style={{ width: "24rem" }} className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4">🔐 Logowanie</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                placeholder="np. jan.kowalski"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Zaloguj się
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
