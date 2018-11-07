import React from 'react';
import { Carousel } from 'react-bootstrap';
export const PhotosPage = (props) => {
 return (
  <div className="content">
    <h1>Photo Gallery</h1>
    <Carousel>
      <Carousel.Item>
        <img height="500px" src="/images/Eric  Kayla 008.jpg" />
      </Carousel.Item>
      <Carousel.Item>
        <img height="500px" src="/images/Eric  Kayla 010.jpg" />
      </Carousel.Item>
      <Carousel.Item>
        <img height="500px" src="/images/Eric  Kayla 019.jpg" />
      </Carousel.Item>
    </Carousel>;
  </div>
 );
}