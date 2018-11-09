import React, { Component } from 'react';
import RSVPCodeForm from './RSVPCodeForm';
import storage from "localforage";

export class WeddingPage extends Component {
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
          <h2>Location</h2>
          <h2>Schedule</h2>
          <h2>Transport</h2>
          <h2>Guest Accommodations</h2>
          <h2>Things to Do</h2>
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
