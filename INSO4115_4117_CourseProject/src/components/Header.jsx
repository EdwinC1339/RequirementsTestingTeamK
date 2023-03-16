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
        <div className="nav-top row navbar-brand">
          <div className="col-sm-3 image">
            <Navbar.Brand href="/">
              {" "}
              <img src={TeamLogo} />
            </Navbar.Brand>
          </div>
          <div className="col-sm-6 navbar-brand">
            <Navbar.Brand href="/contact">
              {" "}
              <img src={Logo} />
            </Navbar.Brand>
          </div>
          <div className="col-sm-3 row align-middle">
            <a type="button" className="btn  sign-in col-sm-12" href="/auth">
              Sign In/Register
            </a>
          </div>
        </div>
        <div className=""></div>

        <Navbar className="custom " expand="lg">
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
