import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    const registered = {
      fullName,
      email,
      password,
    };
    console.log("Registered:", registered);
    fetch("http://localhost:4000/api/signup", {
      method: "POST",
      body: JSON.stringify(registered),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log("Response:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        setIsAuthenticated(true);
        localStorage.setItem("token", data.token);
        navigate("/profile");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <div className="container">
        <div className="form-div">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              className="form-control form-group"
            />

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control form-group"
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control form-group"
            />
            <input
              type="submit"
              className="btn btn-danger btn-block"
              value="Register"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
