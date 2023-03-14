import React, { Component } from "react";
import {
  Navbar,
  NavDropdown,
  Form,
  Container,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/styles.css";
import Logo from "../images/CIETlogo.png";
import TeamLogo from "../images/teamlogo.jpg";
export default class Header extends Component {
  render() {
    return (
      <div className="nav-div">
        <div className="auth-div">
          <img src={TeamLogo} />
          <Link as={Link} to="/auth">
            {/*Place a conditional here*/}
            <button type="button" class="btn btn-outline-secondary">
              SIGN IN
            </button>
          </Link>
        </div>
        <hr />
        <div className="navbar-brand-div">
          <Navbar.Brand href="/">
            {" "}
            <img src={Logo} />
          </Navbar.Brand>
        </div>

        <Navbar className="custom" expand="lg">
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link as={Link} to="/contact">
                {/*Place a conditional here*/}
                PROFILE
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                CONTACT
              </Nav.Link>

              <NavDropdown title="MORE" id="navbarScrollingDropdown">
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
}
