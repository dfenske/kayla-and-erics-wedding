import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import '../index.css';

export class Layout extends Component {
  render() {
    return (
      <div>
        <NavMenu />
        {this.props.children}
      </div>
    );
  }
}
