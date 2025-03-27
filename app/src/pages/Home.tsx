import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center">
      <h2>Witaj w ManagMe</h2>
      <p>Zarządzaj swoimi projektami w prosty sposób</p>
      <Link to="/project" className="btn btn-primary">📁 Przeglądaj projekty</Link>
      <Link to="/project/add" className="btn btn-success ms-2">➕ Dodaj projekt</Link>
    </div>
  );
}
