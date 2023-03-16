import React from "react";
import "../components/styles/styles.css";
import DG from "../images/dot-grid.png";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function Profile() {
  return (
    <body className="profile " style={{ backgroundImage: `url(${DG})` }}>
      <div className="home">
        {" "}
        <Link as={Link} to="/">
          {/*Place a conditional here*/}
          <FontAwesomeIcon icon={faHouse} /> Go back to Home
        </Link>
      </div>
      <div className="profile-info">
        <div className="row">
          <div
            className="col-sm-6 info-left
          "
          >
            <div className="profile-info-left">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Profile Picture"
              />{" "}
              <div className="user-name">
                <h1>Name</h1>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="profile-info-right">
              <h1>About Me</h1>
              <hr />
              <div>
                <p>
                  Algoddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                </p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="profile-personal-info">
                    {" "}
                    <label>Birthday</label>
                    <p>Right now</p>
                  </div>
                  <div className="profile-personal-info">
                    {" "}
                    <label>Age</label>
                    <p>1</p>
                  </div>
                  <div className="profile-personal-info">
                    {" "}
                    <label>Residence</label>
                    <p>PR</p>
                  </div>
                  <div className="profile-personal-info">
                    {" "}
                    <label>Address</label>
                    <p>koko ni</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="profile-personal-info">
                    {" "}
                    <label>Email</label>
                    <p>eldungy@gmail.com</p>
                  </div>
                  <div className="profile-personal-info">
                    {" "}
                    <label>Phone</label>
                    <p>111</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="profile-filters shadow p-3 mb-5 bg-white rounded">
        <h1>My Dietary Restrictions</h1>
      </div>
    </body>
  );
}

export default Profile;
