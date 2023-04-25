import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../components/styles/styles.css";
import Header from "../components/Header";
import { Map } from "../components/Map.js";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import DG from "../images/dot-grid.png";
import Rating from "../components/Rating";

export default class Home extends Component {
  render() {
    const token = localStorage.getItem("token");

    return (
      <div className="home-div">
        <Header />
        <div
          className="map-stuff row "
          style={{ backgroundImage: `url(${DG})` }}
        >
          <div className="filters-container col-lg-5 ">
            <Filters /> <Rating />
          </div>
          <div className="map-container col-lg-7 d-flex justify-content-center">
            <Map />
          </div>
        </div>
        <div className="welcome ">
          <div className="question shadow p-3 mb-5 bg-white rounded">
            <h1>WHAT IS CAN I EAT THERE?</h1>

            <p className="answer">
              Can I Eat There? aims to help people be able to find local food
              services that meet their different dietary preferences.{" "}
            </p>
            <button type="button" className="btn btn-outline-secondary">
              Know more
            </button>
          </div>

          <div className="home-section shadow p-3 mb-5 bg-white rounded">
            <h1>HOW DOES IT WORK?</h1>
            <div className="row">
              <div className="col-lg-4">
                <h2>Step 1</h2>
                <p>Select your dietary restrictions</p>
              </div>
              <div className="col-lg-4">
                <h2>Step 2</h2>
                <p>Get restaurant that meet your dietary preferences</p>
              </div>
              <div className="col-lg-4">
                <h2>Step 3</h2>
                <p>Go and enjoy a good meal!</p>
              </div>
            </div>
          </div>
          <p>Your token is: {token}</p>

          <Link to="/profile">Go to profile</Link>
        </div>
        <Footer />
      </div>
    );
  }
}
