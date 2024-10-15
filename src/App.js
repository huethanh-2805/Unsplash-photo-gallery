import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PhotoGrid from "./components/PhotoGrid";
import PhotoDetails from "./components/PhotoDetails";

const App = () => {
    return (
      <div>
        <Routes>
            {/* Chuyển hướng từ '/' đến '/photos' */}
            <Route path="/" element={<Navigate to="/photos" />} /> 
            <Route path="/photos" element={<PhotoGrid/>}></Route>
            <Route path="/photos/:id" element={<PhotoDetails/>}></Route>
        </Routes>
      </div>  
    );
};

export default App;