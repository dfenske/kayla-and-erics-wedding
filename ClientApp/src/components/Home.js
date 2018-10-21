import React, { Component } from 'react';
import { Carousel } from 'react-materialize'

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div className="content" >
        <div>
          <Carousel options={{ dist: 0, padding: 10, indicators: true }} images={[
            "images/awk.jpg",
            "images/bear.jpg",
            "images/cheek.jpg",
            "images/dressy.jpg",
            "images/excited.jpg",
            "images/flowers.jpg",
            "images/funny.jpg",
            "images/game.jpg",
            "images/juve.jpg",
            "images/kiss.jpg",
            "images/laugh.jpg",
            "images/party.jpg",
            "images/proposal.jpg",
            "images/snow.jpg",
            "images/soccer.jpg"
          ]} />
        </div>
        <h2>Our Story</h2>
      </div>
    );
  }
}
