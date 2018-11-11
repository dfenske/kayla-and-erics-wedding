import React from "react";
import storage from "localforage";

export class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { from: '', subject: '', message: ''};
  }

  onChangeFrom = (e) => {
    this.setState({ from: e.target.value });
  }

  onChangeSubject = (e) => {
    this.setState({ subject: e.target.value });
  }

  onChangeMessage = (e) => {
    this.setState({ message: e.target.value });
  }

  render() {
    const { subject, from, message } = this.state;

    return (
      <div className="content narrow">
        <h2>Contact Us</h2>
        <div className="margin-top">
          <div>From:<span style={{ color: 'red' }}>*</span></div>
          <input onChange={this.onChangeFrom} className="form-control" />
        </div>
        <div className="margin-top">
          <div>Subject:<span style={{ color: 'red' }}>*</span></div>
          <input onChange={this.onChangeSubject} className="form-control" />
        </div>
        <div className="margin-top">
          <div>Message:<span style={{ color: 'red' }}>*</span></div>
          <textarea onChange={this.onChangeMessage} className="form-control" />
          <a href={`mailto:kayla.fenske@gmail.com?subject=From ${from}: ${subject}&body=${message}`} className="btn btn-success btn-block send-btn">Send</a>
        </div>
      </div>
    );
  }
}
