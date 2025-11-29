import { Routes, Route } from "react-router-dom";
import  Feed  from "./pages/Feed";
import { Teste } from "./pages/Teste";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateCommunity from "./pages/CreateCommunity";  
import CreateProject from "./pages/CreateProject";
import CommunityPage from "./pages/CommunityPage";


export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/testeCeci" element={<Teste />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createCommunity" element={<CreateCommunity/>} />
      <Route path="/createProject" element={<CreateProject/>} />
      <Route path="/editProject/:projectId" element={<CreateProject />} />
      <Route path="/editCommunity" element={<CreateCommunity />} />
      <Route path="/r/:communityID" element={<CommunityPage />} />
    </Routes>
  )
}