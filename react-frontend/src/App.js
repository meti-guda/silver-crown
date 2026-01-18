import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import "./styles/style.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/menu" element={<Homepage />} /> {/* Update later */}
      <Route path="/contact" element={<Homepage />} /> {/* Update later */}
    </Routes>
  );
}

export default App;
