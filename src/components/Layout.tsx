import React, { ReactNode, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import { Account } from "./Account";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useThemeStore();

  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const loadFromSession = useAuthStore((state) => state.loadFromSession);

  useEffect(() => {
    loadFromSession();
  }, [loadFromSession]);

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        style={{ borderBottom: "2px solid #444" }}
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            ManagMe
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                🏠 Strona główna
              </Nav.Link>

              {isLoggedIn && (
                <NavDropdown title="📁 Projekty" id="nav-projects">
                  <NavDropdown.Item as={NavLink} to="/project">
                    Lista projektów
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/project/add">
                    Dodaj projekt
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {isLoggedIn ? (
                <Account user={user} onLogout={logout} />
              ) : (
                <Nav.Link as={NavLink} to="/login" className="ms-3">
                  🔐 Zaloguj się
                </Nav.Link>
              )}

              <Button
                onClick={toggleTheme}
                variant="secondary"
                className="ms-5"
              >
                {theme === "light" ? "Tryb ciemny" : "Tryb jasny"}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">{children}</Container>
    </>
  );
};

export default Layout;
