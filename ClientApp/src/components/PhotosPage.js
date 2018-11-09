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
          <h1>Photo Gallery</h1>
          <Carousel>
            <Carousel.Item>
              <img height="500px" alt="eric-kayla" src="/images/Eric  Kayla 008.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img height="500px" alt="eric-kayla" src="/images/Eric  Kayla 010.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img height="500px" alt="eric-kayla" src="/images/Eric  Kayla 019.jpg" />
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
        Loading...
      </div>
    ) : (
      this.renderPage()
    );
  }
}