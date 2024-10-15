import React from "react";
import { Routes, Route } from "react-router-dom";
import PhotoGrid from "./components/PhotoGrid";
import PhotoDetails from "./components/PhotoDetails";

const App = () => {
    return (
      <div>
        <h1>Unsplash Photo Gallery</h1>
        <Routes>
            <Route path="/" element={<PhotoGrid/>}></Route>
            <Route path="/photos/:id" element={<PhotoDetails/>}></Route>
        </Routes>
      </div>  
    );
};

export default App;