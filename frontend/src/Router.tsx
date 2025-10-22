import { Routes, Route } from "react-router-dom";
import { Feed } from "./pages/Feed";
import { Teste } from "./pages/Teste";


export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/testeCeci" element={<Teste />} />
    </Routes>
  )
}