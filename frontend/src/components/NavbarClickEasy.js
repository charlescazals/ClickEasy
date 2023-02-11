import { Navbar, Nav } from 'react-bootstrap';
import logo from '../img/logo.png';
import React from "react";


function NavbarClickEasy() {
    return (
        <Navbar className="navbar-clickeasy" bg="white" expand="md">
            <a href="/">
              <img className="logo" src={logo} alt="ClickEasy Logo" />
            </a>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse style={{flexGrow: 0}} id="responsive-navbar-nav">
              <Nav>
                <a className="btn btn-clickeasy" href='/enter-code'>
                  J'ai un code RDV
                </a>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarClickEasy