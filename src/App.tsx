import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { seedProjects } from "./data/seedProjects";
import { seedUsers } from "./data/seedUsers";
import { seedStories } from "./data/seedStories";

//pages
import Home from "./pages/Home";
//pages project
import AddProject from "./pages/project/AddProject";
import ListProject from "./pages/project/ListProject";
import ItemProject from "./pages/project/ItemProject";
import EditProject from "./pages/project/EditProject";
import DeleteProject from "./pages/project/DeleteProject";
//pages stories
import AddStory from "./pages/stories/AddStory";
import ListStories from "./pages/stories/ListStories";
import ItemStories from "./pages/stories/ItemStories";
import EditStories from "./pages/stories/EditStories";
import DeleteStories from "./pages/stories/DeleteStories";

import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  useEffect(() => {
    seedUsers();
    seedProjects();
    seedStories();
  }, []);

  return (
    <Router>
      <div className="container">
        <div className="text-center mt-4">
          <h1 className="display-5 fw-bold text-primary">ManagMe - Projekty</h1>
          <p className="lead">Zarządzaj swoimi projektami w prosty sposób</p>
        </div>
        <Routes>
          {/* pages*/}
          <Route path="/" element={<Home />} />
          {/* pages project */}
          <Route path="/project/add" element={<AddProject />} />
          <Route path="/project" element={<ListProject />} />
          <Route path="/project/:id" element={<ItemProject />} />
          <Route path="/project/edit/:id" element={<EditProject />} />
          <Route path="/project/delete/:id" element={<DeleteProject />} />
          {/* pages stories */}
          <Route path="/project/:id/stories/add" element={<AddStory />} />
          <Route path="/project/:id/stories" element={<ListStories />} />
          <Route path="/stories" element={<ListStories />} />
          <Route path="/stories/:id" element={<ItemStories />} />
          <Route path="/stories/edit/:id" element={<EditStories />} />
          <Route path="/stories/delete/:id" element={<DeleteStories />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
