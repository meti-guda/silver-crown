import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import Contact from "./components/pages/Contact";
import MenuPage from "./components/pages/Menupage";
import "./styles/style.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
