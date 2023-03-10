import React, { Component } from "react";

import "../components/styles/styles.css";
import Header from "../components/Header";

export default class Home extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="welcome">
          <h1 className="welcome-header">Hi!</h1>
          <p>
            What is Can I Eat There? Can I Eat There? aims to help people be
            able to find local food services that meet their different dietary
            preferences.{" "}
          </p>
          <button type="button" class="btn btn-outline-secondary">
            Know more
          </button>
        </div>

        <hr className="divsection" />
        <div className="horarios">
          <h1 className="horario">How does it work?</h1>
          <div className="row">
            <div className="col-lg-6">
              <h2 className="horario-header">Step 1</h2>
              <p className="horario-text">Fill in questionnaire</p>
            </div>
            <div className="col-lg-6">
              <h2 className="horario-header">Step 2</h2>
              <p className="horario-text">
                Get restaurant that meet your dietary preferences
              </p>
            </div>
          </div>
        </div>

        <hr className="divsection" />
        <div className="distrito">
          <p>Socials</p>
        </div>
      </div>
    );
  }
}
