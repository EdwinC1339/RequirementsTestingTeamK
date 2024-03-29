import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Profile from "./pages/Profile.jsx";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import Restaurants from "./pages/Restaurants.jsx";
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/restaurants" element={<Restaurants />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
