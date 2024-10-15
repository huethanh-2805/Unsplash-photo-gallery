import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PhotoGrid from "./components/PhotoGrid";
import PhotoDetails from "./components/PhotoDetails";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/Unsplash-photo-gallery" element={<Navigate to="/photos" />} />
        <Route path="/photos" element={<PhotoGrid />} />
        <Route path="/photos/:id" element={<PhotoDetails />} />
      </Routes>
    </div>
  );
};

export default App;