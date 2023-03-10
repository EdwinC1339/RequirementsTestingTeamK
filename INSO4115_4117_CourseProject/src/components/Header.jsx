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
import Home from "../pages/Home";
import Contact from "../pages/Contact";

export default class Header extends Component {
  render() {
    return (
      <div>
        {" "}
        <div className="navbar-brand-div">
          <Navbar.Brand href="/">Can I Eat There?</Navbar.Brand>{" "}
        </div>
        <Navbar className="mine" expand="lg">
          {" "}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>

              <NavDropdown title="More" id="navbarScrollingDropdown">
                <NavDropdown.Divider />

                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
