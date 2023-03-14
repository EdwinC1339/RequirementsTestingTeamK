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
        <div className="nav-top row">
          <div className="col-sm-3">
            <img src={TeamLogo} />
          </div>
          <div className="col-sm-6 navbar-brand-div">
            <Navbar.Brand href="/">
              {" "}
              <img src={Logo} />
            </Navbar.Brand>
          </div>
          <div className="col-sm-3 row align-middle">
          <button type="button" className="btn btn-outline-secondary sign-in col-sm-6">
              SIGN IN
          </button>
          <button type="button" className="btn btn-outline-secondary sign-in col-sm-6">
              SIGN UP
          </button>
          </div>
        </div>
        <div className="">

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
