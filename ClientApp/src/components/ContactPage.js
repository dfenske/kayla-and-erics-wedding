import React from "react";
import storage from "localforage";

export class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, cookie: "" };
  }

  render() {
    return (
      <div className="content narrow">
        <h2>Contact Us</h2>
        <div>
          <div>From:<span style={{ color: 'red' }}>*</span></div>
          <input className="form-control" />
        </div>
        <div>
          <div>Subject:<span style={{ color: 'red' }}>*</span></div>
          <input className="form-control" />
        </div>
        <div>
          <div>Message:<span style={{ color: 'red' }}>*</span></div>
          <textarea className="form-control" />
          <div className="btn btn-success btn-block send-btn">Send</div>
        </div>
      </div>
    );
  }
}
