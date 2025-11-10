import { Routes, Route } from "react-router-dom";
import  Feed  from "./pages/Feed";
import { Teste } from "./pages/Teste";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";


export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/testeCeci" element={<Teste />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}