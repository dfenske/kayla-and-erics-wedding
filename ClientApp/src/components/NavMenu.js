import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./NavMenu.css";

export const NavMenu = props => {
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
          <LinkContainer to="/wedding">
            <NavItem>The Wedding</NavItem>
          </LinkContainer>
          <LinkContainer to="/rsvp">
            <NavItem>RSVP</NavItem>
          </LinkContainer>
          <LinkContainer to="/photos">
            <NavItem>Gallery</NavItem>
          </LinkContainer>
          <LinkContainer to="/registry">
            <NavItem>Registry</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
