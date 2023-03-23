import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import "./styles/styles.css";
const Result = () => {
  return <p>Your message has been succesfully sent</p>;
};
function ContactUs(props) {
  const [result, showResult] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2g975pc",
        "template_k9przkd",
        e.target,
        "aT5wsNnGkgvuLyMzO"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    showResult(true);
  };
  setTimeout(() => {
    showResult(false);
  }, 5000);
  return (
    <div className="contact-us">
      <form onSubmit={sendEmail}>
        <div className="row">
          <div className="name-email col-lg-6">
            <label>Name:</label>
            <input type="text" name="fullName" required />
          </div>
          <div className="name-email col-lg-6">
            <label>Email:</label>
            <input type="email" name="email" required />
          </div>
        </div>
        <div className="text-area-message">
          <div>
            <label className="message-label">Message</label>
          </div>
          <div className="message-area">
            <textarea
              name="message"
              placeholder="Write your message here"
              required
            />
          </div>

          <div className="submit">
            <button
              type="submit"
              value="Send"
              className="btn btn-outline-secondary"
            >
              Submit
              <div className="row">{result ? <Result /> : null}</div>
            </button>
          </div>
        </div>{" "}
      </form>
    </div>
  );
}

export default ContactUs;
