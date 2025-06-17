import { useState } from "react";
import { Container, Row, Col, Button, Card, Alert } from "react-bootstrap";
import { User } from "../models/User";
import { AuthSupabase } from "../services/AuthSupabase";
import { UserService } from "../services/UserService";

export default function Example() {
  const [status, setStatus] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const email = "admin@example.com";
  const password = "admin123";
  const name = "Administration";
  const role = "admin";

  const testRegister = async () => {
    try {
      setStatus("Registering...");
      await AuthSupabase.signUp(email, password, name, role);
      setStatus("Successfully registered!");
    } catch (err: any) {
      setStatus("Registration error: " + err.message);
    }
  };

  const testLogin = async () => {
    try {
      setStatus("Logging in...");
      const userData = await AuthSupabase.login(email, password);
      setUser(userData);
      setStatus("Successfully logged in!");
    } catch (err: any) {
      setStatus("Login error: " + err.message);
    }
  };

  const checkUser = async () => {
    try {
      setStatus("Fetching current user...");
      const currentUser = await AuthSupabase.getCurrentUser();
      setUser(currentUser);
      setStatus("User fetched.");
    } catch (err: any) {
      setStatus("User fetch error: " + err.message);
    }
  };

  const testLogout = async () => {
    try {
      await AuthSupabase.logout();
      setUser(null);
      setStatus("Logged out.");
    } catch (err: any) {
      setStatus("Logout error: " + err.message);
    }
  };

  // ⬇ Testy UserService

  const fetchAllUsers = async () => {
    try {
      setStatus("Fetching all users...");
      const all = await UserService.getAll();
      setUsers(all);
      setStatus("Users loaded.");
    } catch (err: any) {
      setStatus("Fetch error: " + err.message);
    }
  };

  const fetchDevUsers = async () => {
    try {
      setStatus("Fetching developers and devops...");
      const devs = await UserService.getByRoles(["developer", "devops"]);
      setUsers(devs);
      setStatus("Filtered users loaded.");
    } catch (err: any) {
      setStatus("Filter error: " + err.message);
    }
  };

  const fetchById = async () => {
    if (!user?.id) {
      setStatus("Log in to fetch user by ID.");
      return;
    }
    try {
      setStatus("Fetching user by ID...");
      const result = await UserService.getById(user.id);
      setUsers(result ? [result] : []);
      setStatus("User loaded by ID.");
    } catch (err: any) {
      setStatus("Fetch by ID error: " + err.message);
    }
  };

  return (
    <Container className="py-5">
      <h2>Supabase Auth + UserService Test</h2>
      {status && <Alert variant="info">{status}</Alert>}

      <Row className="mb-3">
        <Col><Button onClick={testRegister} variant="success">Register</Button></Col>
        <Col><Button onClick={testLogin}>Login</Button></Col>
        <Col><Button variant="secondary" onClick={checkUser}>Get Current User</Button></Col>
        <Col><Button variant="danger" onClick={testLogout}>Logout</Button></Col>
      </Row>

      <Row className="mb-4">
        <Col><Button onClick={fetchAllUsers}>Fetch All Users</Button></Col>
        <Col><Button onClick={fetchDevUsers}>Fetch Devs</Button></Col>
        <Col><Button onClick={fetchById}>Fetch by My ID</Button></Col>
      </Row>

      {user && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Current Logged User</Card.Title>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </Card.Body>
        </Card>
      )}

      {users.length > 0 && (
        <Card>
          <Card.Body>
            <Card.Title>User List</Card.Title>
            <pre>{JSON.stringify(users, null, 2)}</pre>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
