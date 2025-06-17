import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { ThemeWrapper } from "./components/ThemeWrapper";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
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
import AssignTask from "./pages/tasks/AssignTask";
import MarkDoneTask from "./pages/tasks/MarkDoneTask";

function App() {
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
            path="/project"
            element={<ProtectedRoute page={<ListProject />} />}
          />
          <Route
            path="/project/:projectId"
            element={<ProtectedRoute page={<ItemProject />} />}
          />
          <Route
            path="/project/add"
            element={<ProtectedRoute page={<AddProject />} />}
          />
          <Route
            path="/project/edit/:projectId"
            element={<ProtectedRoute page={<EditProject />} />}
          />
          <Route
            path="/project/delete/:projectId"
            element={<ProtectedRoute page={<DeleteProject />} />}
          />
          {/* pages stories */}
          <Route
            path="/project/:projectId/stories"
            element={<ProtectedRoute page={<ListStories />} />}
          />
          <Route
            path="project/:projectId/stories/:storyId"
            element={<ProtectedRoute page={<ItemStories />} />}
          />
          <Route
            path="/project/:projectId/stories/add"
            element={<ProtectedRoute page={<AddStory />} />}
          />

          <Route
            path="/project/:projectId/stories/edit/:storyId"
            element={<ProtectedRoute page={<EditStories />} />}
          />
          <Route
            path="/project/:projectId/stories/delete/:storyId"
            element={<ProtectedRoute page={<DeleteStories />} />}
          />
          {/* pages tasks */}
          <Route
            path="/project/:projectId/stories/:storyId/tasks/"
            element={<ProtectedRoute page={<ListTasks />} />}
          />
          <Route
            path="/project/:projectId/stories/:storyId/tasks/:tasksId"
            element={<ProtectedRoute page={<ItemTasks />} />}
          />
          <Route
            path="/project/:projectId/stories/:storyId/tasks/add"
            element={<ProtectedRoute page={<AddTasks />} />}
          />
          <Route
            path="/project/:projectId/stories/:storyId/tasks/edit/:tasksId"
            element={<ProtectedRoute page={<EditTasks />} />}
          />
          <Route
            path="/project/:projectId/stories/:storyId/tasks/delete/:tasksId"
            element={<ProtectedRoute page={<DeleteTasks />} />}
          />
          <Route
            path="/project/:projectId/stories/:storyId/tasks/:tasksId/assign"
            element={<ProtectedRoute page={<AssignTask />} />}
          />
          <Route
            path="/project/:projectId/stories/:storyId/tasks/:tasksId/done"
            element={<ProtectedRoute page={<MarkDoneTask />} />}
          />
        </Routes>
      </Layout>
    </ThemeWrapper>
  );
}

export default App;
