import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/">
          <h3>Note App</h3>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#contact">Contact Us</Nav.Link>
          <Nav.Link href="#help">Help</Nav.Link>
          <Nav.Link href="#support">Support Forum</Nav.Link>
          <Nav.Link href="#blog">Blog</Nav.Link>
          <Link to="/login" className="nav-link">Log In</Link>
          <Link to="/signup" className="nav-link btn btn-outline-primary">Sign Up</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
