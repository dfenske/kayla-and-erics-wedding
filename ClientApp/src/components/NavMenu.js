import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './NavMenu.css';

export const NavMenu = (props) => {
 return (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Kayla and Eric's Wedding</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} href="/wedding">
          The Wedding
        </NavItem>
        <NavItem eventKey={2} href="/rsvp">
          RSVP
        </NavItem>
        <NavItem eventKey={2} href="/photos">
          Gallery
        </NavItem>
        <NavItem eventKey={2} href="/registry">
          Registry
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
 );
}