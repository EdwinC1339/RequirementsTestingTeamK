import React, { Component } from "react";

import "../components/styles/styles.css";
import Header from "../components/Header";
import Map from "../components/Map";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export default class Home extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="auth-div">
          <Link as={Link} to="/auth">
            {/*Place a conditional here*/}
            Sign In
          </Link>
        </div>
        <Header />
        <Map />
        <div className="welcome">
          <h1>Hi!</h1>
          <h2>What is Can I Eat There?</h2>
          <p>
            Can I Eat There? aims to help people be able to find local food
            services that meet their different dietary preferences.{" "}
          </p>
          <button type="button" class="btn btn-outline-secondary">
            Know more
          </button>
        </div>
        <hr className="divsection" />
        <div className="home-section">
          <h1>How does it work?</h1>
          <div className="row">
            <div className="col-lg-6">
              <h2>Step 1</h2>
              <p>Fill in questionnaire</p>
            </div>
            <div className="col-lg-6">
              <h2>Step 2</h2>
              <p>Get restaurant that meet your dietary preferences</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
