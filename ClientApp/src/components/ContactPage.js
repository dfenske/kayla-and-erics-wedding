import React from "react";

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
      <div className="content narrow center bordered">
        <div className="leaves"><img src="/images/leaves.png" /></div>
        <h2 className="page-title" >Contact Us</h2>
        <div className="margin-top">
          If you have any questions, please email us.
          
          <div className="margin-top"> <strong><a href="mailto:kayla.fenske@gmail.com">kayla.fenske@gmail.com</a></strong></div>
          <div className="margin-top"><strong><a href="mailto:ericmuzz@gmail.com">ericmuzz@gmail.com</a></strong></div>
            
        </div>
      </div>
    );
  }
}
