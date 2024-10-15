import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PhotoGrid from "./components/PhotoGrid";
import PhotoDetails from "./components/PhotoDetails";

const App = () => {
  return (
   
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/photos" />} />
          <Route path="/Unsplash-photo-gallery/photos" element={<PhotoGrid />} />
          <Route path="/Unsplash-photo-gallery/photos/:id" element={<PhotoDetails />} />
        </Routes>
      </div>

  );
};

export default App;