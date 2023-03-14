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
export default class Header extends Component {
  render() {
    return (
      <div className="nav-div">
        <div className="navbar-brand-div">
          <Navbar.Brand href="/">Can I Eat There?</Navbar.Brand>
        </div>
        <Navbar className="custom" expand="lg">
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link as={Link} to="/contact">
                {/*Place a conditional here*/}
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>

              <NavDropdown title="More" id="navbarScrollingDropdown">
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
