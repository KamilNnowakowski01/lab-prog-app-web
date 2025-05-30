import { Dropdown } from "react-bootstrap";
import { User } from "../models/User";

type AccountProps = {
  user: User | null;
  onLogout: () => void;
};

export const Account = ({ user, onLogout }: AccountProps) => {
  if (!user) return null;

  return (
    <Dropdown className="ms-3">
      <Dropdown.Toggle variant="outline-light" id="account-dropdown">
        👤 {user.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.ItemText>Rola: {user.role}</Dropdown.ItemText>
        <Dropdown.Divider />
        <Dropdown.Item as="button" onClick={onLogout} className="text-danger">
          Wyloguj się
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
