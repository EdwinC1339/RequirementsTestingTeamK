import React, { useState, useEffect } from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles/styles.css";
import Logo from "../images/CIETlogo.png";
import TeamLogo from "../images/teamlogo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import jwt_decode from "jwt-decode";

function Header() {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Running useEffect in Header");
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log("Token found:", storedToken);
      setIsAuthenticated(true);
    } else {
      setToken(null);
      console.log("Token not found");
      setIsAuthenticated(false);
    }
  }, []);

  let decodedToken;
  try {
    decodedToken = jwt_decode(token);
    console.log("Decoded token:", decodedToken);
  } catch (err) {
    console.error("Invalid token specified:", err);
  }

  return (
    <div className="nav-div">
      <div className="nav-top row navbar-brand">
        <div className="col-sm-3 image">
          <Navbar.Brand href="/">
            {" "}
            <img src={TeamLogo} />
          </Navbar.Brand>
        </div>
        <div className="col-sm-6 navbar-brand">
          <Navbar.Brand href="/">
            {" "}
            <img src={Logo} />
          </Navbar.Brand>
        </div>
        <div className="col-sm-3 row align-middle">
          {!isAuthenticated && (
            <>
              <a
                type="button"
                className="btn sign-in col-sm-12"
                href="/register"
              >
                <FontAwesomeIcon icon={faRightToBracket} />
                Register
              </a>
              <a type="button" className="btn sign-in col-sm-12" href="/signin">
                <FontAwesomeIcon icon={faRightToBracket} />
                Sign In
              </a>
            </>
          )}
        </div>
      </div>
      <div className=""></div>

      <Navbar className="custom " expand="lg">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto" style={{ maxHeight: "100px" }} navbarScroll>
            {isAuthenticated ? (
              <Nav.Link as={Link} to="/profile">
                <FontAwesomeIcon icon={faUser} />
                PROFILE<div className="vr"></div>
              </Nav.Link>
            ) : null}

            <Nav.Link as={Link} to="/contact">
              <FontAwesomeIcon icon={faEnvelope} />
              CONTACT US
            </Nav.Link>
            <div className="vr"></div>
            <NavDropdown title="+MORE" id="navbarScrollingDropdown">
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
