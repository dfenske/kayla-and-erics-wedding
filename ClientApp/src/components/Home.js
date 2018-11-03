import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div className="content">
        <div>
          <img src="images/Eric  Kayla 019.jpg" width="100%" alt="erickayla"/>
        </div>
        <h2>Our Story</h2>
      </div>
    );
  }
}
