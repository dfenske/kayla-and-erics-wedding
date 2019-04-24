import React from 'react';
import { Carousel } from 'react-bootstrap';
import RSVPCodeForm from './RSVPCodeForm';
import storage from "localforage";

export class PhotosPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, cookie: ''};
  }
  componentWillMount = () => {
    storage.getItem("rsvpcode").then(code => {
      if (code) {
        this.setState({
          loading: false,
          cookie: code
        });
      } else {
        this.setState({
          loading: false
        });
      }
    });
  };

  refreshPage = () => {
    storage.getItem("rsvpcode")
      .then(cookie => {
        if (cookie) {
          this.setState({
            cookie,
            loading: false
          });
      } else {
        this.setState({
          loading: false
        })
      }
    });
  };

  renderPage() {
    const { cookie } = this.state;
    
    if (!cookie) {
      return <RSVPCodeForm refreshPage={this.refreshPage} />;
    } else {
      return (
        <div className="content">
          <div className="flourish"><img src="/images/flourish.png" /></div>
          <h2 className="page-title">Photo Gallery</h2>
          <Carousel>
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/Eric  Kayla 008.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/Eric  Kayla 010.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/Eric  Kayla 047.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/Eric  Kayla 019.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/Eric  Kayla 068.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/bostonsoccer.jpg" />
            </Carousel.Item>    
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/bear.jpg" />
            </Carousel.Item>   
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/dressy.jpg" />
            </Carousel.Item>   
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/flowers.jpg" />
            </Carousel.Item>   
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/funny.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/cheek.jpg" />
            </Carousel.Item>   
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/soccer.jpg" />
            </Carousel.Item>   
            <Carousel.Item>
              <img alt="eric-kayla" src="/images/excited.jpg" />
            </Carousel.Item>   
          </Carousel>
        </div>
      );
    }
  }
  
  render() {
    const { loading } = this.state;

    return loading ? (
      <div className="content flex loading">
        <i className="icon-animate-spin icon-spin" />
      </div>
    ) : (
      this.renderPage()
    );
  }
}