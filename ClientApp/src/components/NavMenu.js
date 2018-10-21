import React, { Component } from 'react';
import { Icon } from 'react-materialize';
import './NavMenu.css';

export class NavMenu extends Component {
  render() {
    return (
      <div className="nav">
        <div className="mr-mrs" >
          <img src="images/mr mrs.jpg" alt="logo" />
        </div>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">Kayla and Eric's Wedding</a>
            <a href="/" data-target="mobile-demo" className="sidenav-trigger"><Icon>menu</Icon></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="wedding">Our wedding</a></li>
              <li><a href="registry">Registry</a></li>
              <li><a href="rsvp">RSVP</a></li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li><img src="images/mr mrs.jpg" alt="logo" className="small-mr-mrs" /></li>
          <li><a href="wedding">Our wedding</a></li>
          <li><a href="registry">Registry</a></li>
          <li><a href="rsvp">RSVP</a></li>
        </ul>
      </div>
    );
  }
}
