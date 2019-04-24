import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import '../index.css';

export class Layout extends Component {
  render() {
    return (
      <div className="layout">
      <div className="background">
      </div>
      <div className="page">
        <NavMenu />
        {this.props.children}
      </div>
      </div>
    );
  }
}
