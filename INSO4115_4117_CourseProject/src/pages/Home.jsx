import React, { Component } from "react";

import "../components/styles/styles.css";
import Header from "../components/Header";

export default class Home extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="welcome">
          <h1 className="welcome-header">hi</h1>
          <p className="welcome-text">h</p>
          <button type="button" class="btn btn-outline-secondary">
            Conocer más
          </button>
        </div>

        <hr className="divsection" />
        <div className="horarios">
          <h1 className="horario">H</h1>
          <div className="row">
            <div className="col-lg-6">
              <h2 className="horario-header">Mi</h2>
              <p className="horario-text">7:</p>
            </div>
            <div className="col-lg-6">
              <h2 className="horario-header">h</h2>
              <p className="horario-text">
                <h4 className="horario-section">Esh</h4>
                9:00 am - 10:20 am
                <h4 className="just-space"></h4>
                <h4 className="horario-section">h</h4>h
              </p>
            </div>
          </div>
        </div>
        <hr className="divsection" />
        <div className="distrito">
          <p>j</p>
        </div>
        <hr className="divsection" />
        <div className="distrito">
          <p>Socials</p>
        </div>
      </div>
    );
  }
}
