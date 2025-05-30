import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { seeds } from "./seeds/seeds";

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
//pages tasks
import ListTasks from "./pages/tasks/ListTasks";
import ItemTasks from "./pages/tasks/ItemTasks";
import AddTasks from "./pages/tasks/AddTasks";
import EditTasks from "./pages/tasks/EditTasks";
import DeleteTasks from "./pages/tasks/DeleteTasks";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { ThemeWrapper } from "./components/ThemeWrapper";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  useEffect(() => {
    seeds();
  }, []);

  return (
    <ThemeWrapper>
      <Layout>
        <Routes>
          {/* pages*/}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* pages project */}
          <Route
            path="/project/add"
            element={<ProtectedRoute page={<AddProject />} />}
          />
          <Route
            path="/project"
            element={<ProtectedRoute page={<ListProject />} />}
          />
          <Route
            path="/project/:id"
            element={<ProtectedRoute page={<ItemProject />} />}
          />
          <Route
            path="/project/edit/:id"
            element={<ProtectedRoute page={<EditProject />} />}
          />
          <Route
            path="/project/delete/:id"
            element={<ProtectedRoute page={<DeleteProject />} />}
          />
          {/* pages stories */}
          <Route
            path="/project/:id/stories/add"
            element={<ProtectedRoute page={<AddStory />} />}
          />
          <Route
            path="/project/:id/stories"
            element={<ProtectedRoute page={<ListStories />} />}
          />
          <Route
            path="/stories"
            element={<ProtectedRoute page={<ListStories />} />}
          />
          <Route
            path="/stories/:id"
            element={<ProtectedRoute page={<ItemStories />} />}
          />
          <Route
            path="/stories/edit/:id"
            element={<ProtectedRoute page={<EditStories />} />}
          />
          <Route
            path="/stories/delete/:id"
            element={<ProtectedRoute page={<DeleteStories />} />}
          />
          {/* pages tasks */}
          <Route
            path="/stories/:id/tasks/"
            element={<ProtectedRoute page={<ListTasks />} />}
          />
          <Route
            path="/tasks"
            element={<ProtectedRoute page={<ListTasks />} />}
          />
          <Route
            path="/tasks/:id"
            element={<ProtectedRoute page={<ItemTasks />} />}
          />
          <Route
            path="/stories/:storyId/tasks/add"
            element={<ProtectedRoute page={<AddTasks />} />}
          />
          <Route
            path="/tasks/edit/:id"
            element={<ProtectedRoute page={<EditTasks />} />}
          />
          <Route
            path="/tasks/delete/:id"
            element={<ProtectedRoute page={<DeleteTasks />} />}
          />
        </Routes>
      </Layout>
    </ThemeWrapper>
  );
}

export default App;
