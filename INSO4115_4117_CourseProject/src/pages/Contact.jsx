import React, { Component } from "react";
import ContactUs from "../components/ContactUs";
import Header from "../components/Header";
import "../components/styles/styles.css";
import DG from "../images/dot-grid.png";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class Contact extends Component {
  render() {
    return (
      <body className="contact-page">
        <div className="contact-div">
          {" "}
          <Header />
          <h1>Contact Us</h1>
          <div className="contact-message">
            <div className="message-section shadow p-3 mb-5 bg-white rounded">
              <h1>Have a question?</h1>
              <hr />
              <p>
                Can I Eat There? aims to help people be able to find local food
                services that meet their different dietary preferences. We want
                to know how we can make our website better for you or if you
                have any concern that you would like to share with us.
              </p>
              <ContactUs />
            </div>
            <div className="email-section shadow p-3 mb-5 bg-white rounded">
              {" "}
              <div className="email">
                <h1>Email</h1>
                <hr />
                <FontAwesomeIcon icon={faEnvelope} />
                <div>
                  <h2>canieatthereofficial@gmail.com</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="copyright">
            <p>©2023 Can I Eat There? All Rights Reserved</p>
          </div>
        </div>
      </body>
    );
  }
}
