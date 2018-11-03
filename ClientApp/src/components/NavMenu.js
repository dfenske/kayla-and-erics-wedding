import React from 'react';
import { Navbar, Nav, MenuItem } from 'react-bootstrap';
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
        <MenuItem eventKey={1} href="/wedding">
          The Wedding
        </MenuItem>
        <MenuItem eventKey={2} href="/rsvp">
          RSVP
        </MenuItem>
        <MenuItem eventKey={2} href="/photos">
          Gallery
        </MenuItem>
        <MenuItem eventKey={2} href="/registry">
          Registry
        </MenuItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
 );
}