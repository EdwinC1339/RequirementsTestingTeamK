import logo from "./logo.svg";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Contact from "./pages/Contact.jsx";
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

          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
