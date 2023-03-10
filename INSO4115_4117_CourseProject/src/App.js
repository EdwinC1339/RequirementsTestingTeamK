import logo from "./logo.svg";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Component } from "react";

function App() {
  return (
    <div className="App">
      <Router>
        {" "}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
