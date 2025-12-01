import { Routes, Route } from "react-router-dom";
import  Feed  from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateCommunity from "./pages/CreateCommunity";  
import CreateProject from "./pages/CreateProject";
import CommunityPage from "./pages/CommunityPage";
import EditProfile from "./pages/EditProfile";
import ProjectPage from "./pages/ProjectPage";
import { ProtectedRoute } from "./components/config/ProtectedRoute";

export function Router() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* Rotas privadas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createCommunity" element={<CreateCommunity/>} />
        <Route path="/createProject" element={<CreateProject/>} />
        <Route path="/editProject/:projectId" element={<CreateProject />} />
        <Route path="/editCommunity" element={<CreateCommunity />} />
        <Route path="/r/:communityID" element={<CommunityPage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
      </Route>
    </Routes>
  )
}