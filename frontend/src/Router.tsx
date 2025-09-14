import { Routes, Route } from "react-router-dom";
import { Feed } from "./pages/Feed";


export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
    </Routes>
  )
}