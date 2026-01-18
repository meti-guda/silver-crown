import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import "./styles/style.css";
import Contact from "./components/pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/menu" element={<Homepage />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
