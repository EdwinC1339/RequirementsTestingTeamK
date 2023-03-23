import React, { Component } from "react";
import "./styles/styles.css";
import ContactUs from "./ContactUs";
export default class Footer extends Component {
  render() {
    return (
      <div className="footer-div">
        <div className="short-info">
          {" "}
          <h1>Want to know more?</h1>
          <p>
            Well I am terribly sorry, Leamsi has not finished his tasks yet so
            expect it by 2024.
          </p>
        </div>

        <hr className="contact-hr" />

        <div className="form">
          <h1>CONTACT US</h1>
          <p>
            If you have any recommendations, ideas,or would like to add any
            dietary restriction not available in the selection, feel free to
            contact us!{" "}
          </p>
          <ContactUs />
        </div>
        <div className="copyright">
          <p>©2023 Can I Eat There? All Rights Reserved</p>
        </div>
      </div>
    );
  }
}
