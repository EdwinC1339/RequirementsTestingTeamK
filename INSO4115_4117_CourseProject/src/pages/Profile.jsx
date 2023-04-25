import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../components/styles/styles.css";
import DG from "../images/dot-grid.png";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  fetch("http://localhost:4000/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User data:", data);
      setFullName(data.fullName);
      setEmail(data.email);
    })
    .catch((error) => {
      console.log("Error while fetching user data:", error);
    });

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    try {
      const response = await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("Error while logging out user:", err);
      // handle error
    }
  };

  return (
    <body className="profile " style={{ backgroundImage: `url(${DG})` }}>
      <div className="home">
        <Link as={Link} to="/">
          <FontAwesomeIcon icon={faHouse} /> Go back to Home
        </Link>
      </div>
      <div className="profile-info">
        <div className="row">
          <div className="col-sm-6 info-left">
            <div className="profile-info-left">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Profile Picture"
              />{" "}
              <div className="user-name">
                <p>{fullName}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="profile-info-right">
              <div className="row">
                <div className="col-md-6">
                  <div className="profile-personal-info">
                    <label>Email</label>

                    <p>{email}</p>
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
      <button onClick={handleLogout}>Logout</button>
    </body>
  );
}

export default Profile;
