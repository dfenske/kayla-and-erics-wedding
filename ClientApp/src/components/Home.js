import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
        <div className="mr-mrs" >
          <img src="images/mr mrs.jpg" />
        </div>
        <div className="nav">
          <nav>
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">Kayla and Eric's Wedding</a>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li><a href="wedding.html">Our wedding</a></li>
                <li><a href="registry.html">Registry</a></li>
                <li><a href="photos.html">Photos</a></li>
                <li><a href="rsvp.html">RSVP</a></li>
              </ul>
            </div>
          </nav>

          <ul className="sidenav" id="mobile-demo">
            <li><img src="images/mr mrs.jpg" className="small-mr-mrs" /></li>
            <li><a href="wedding.html">Our wedding</a></li>
            <li><a href="registry.html">Registry</a></li>
            <li><a href="photos.html">Photos</a></li>
            <li><a href="rsvp.html">RSVP</a></li>
          </ul>
        </div>
        <div className="content flex">
          <div className="tint">
            <img className="center-photo" src="images/dressy.jpg" />
          </div>
          <div className="page-title">kayla and eric &#x2022; september 21st, 2019</div>
        </div>

        <div className="our-story" >
          <h2>Our Story</h2>
          <div>
            Demand to be let outside at once, and expect owner to wait for me as i think about it i just saw other cats inside the house and nobody ask me before using my litter box and sometimes switches in french and say "miaou" just because well why not with tail in the air or meow meow, i tell my human pretend not to be evil. Eat owner's food sleep nap i just saw other cats inside the house and nobody ask me before using my litter box, or eat the fat cats food but show belly. Flex claws on the human's belly and purr like a lawnmower stand in front of the computer screen demand to be let outside at once, and expect owner to wait for me as i think about it purrr purr littel cat, little cat purr purr dont wait for the storm to pass, dance in the rain, refuse to drink water except out of someone's glass but the fat cat sat on the mat bat away with paws.
          </div>
        </div>
      </div>
    );
  }
}
