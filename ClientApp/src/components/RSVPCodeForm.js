import React from 'react';
import PropTypes from 'prop-types';
import storage from "localforage";

export default class RSVPCodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }

  submit = (e) => {
    e.preventDefault(); 

    const { code } = this.state;

    if (!code) {
      console.log('no code entered');
      return;
    } else {
      // look up if it's valid
      fetch(`api/guests/${code}`)
        .then(response => response.json())
        .then(data => 
          {
            if (data.length > 0) {
              console.log(`${code} is a valid code, setting cookie`);
              // set cookie
              storage.setItem('rsvpcode', this.state.code)
                .then(() => {
                  this.props.refreshPage();
                });
            } else {
              console.log('not a valid code');
            }
        });
    }
  }

  changeCode = (e) => {
    this.setState({
      code: e.target.value
    });
  }

  render() {
    return (
      <div className="content rsvp">
        <h1>RSVP</h1>
        <div>
          <form>
            <div>
              To access this page, please enter the RSVP code - you can find this code on your invitation.
            </div>
            <input className="center" onChange={this.changeCode} />
            <button onClick={this.submit} className="btn btn-info">Submit</button>
            <div className="forgot-link"><a href="/contact">Forgot your code? Send us a message</a></div>
          </form>
        </div>
      </div>
    );
  }
};

RSVPCodeForm.propTypes = {
  refreshPage: PropTypes.func
};