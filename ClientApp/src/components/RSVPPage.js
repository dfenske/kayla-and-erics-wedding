import React, { Component } from "react";
import RSVPCodeForm from "./RSVPCodeForm";
import storage from "localforage";

export class RSVPPage extends Component {
  constructor(props) {
    super(props);
    this.state = { guests: [], loading: true, cookie: "" };
  }

  componentWillMount = () => {
    storage.getItem("rsvpcode").then(code => {
      fetch(`api/guests/${code}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            console.log(`${code} is a valid code, setting cookie`);
            // set cookie
            this.setState({
              loading: false,
              cookie: code,
              guests: data
            });
          } else {
            console.log("not a valid code");
            this.setState({
              loading: false
            });
          }
        });
    });
  };

  refreshPage = () => {
    storage.getItem("rsvpcode")
      .then(cookie => {
        fetch(`api/guests/${cookie}`)
        .then(res => res.json())
        .then(guests => {
          this.setState({
            cookie,
            guests,
            loading: false
          });
        });
      });
  };

  renderPage = () => {
    const { cookie, guests } = this.state;

    if (!cookie) {
      return <RSVPCodeForm refreshPage={this.refreshPage} />;
    } else {
      return (
        <div className="content rsvp">
          <h1>RSVP</h1>
          <form>
            <div>
              <div>Will you be attending?</div>
              <div className="radio-headers">
                <div>Name</div>
                <div>Yes</div>
                <div>No</div>
              </div>
              {guests.map((g, i) => (
                <div key={g.firstName + i} className="radio">
                  <label>{`${g.firstName} ${g.lastName}`}</label>
                  <input
                    type="radio"
                    name={`${g.firstName} ${g.lastName}`}
                    value="yes"
                  />
                  <input
                    type="radio"
                    name={`${g.firstName} ${g.lastName}`}
                    value="no"
                  />
                </div>
              ))}
            </div>

            <div>Email Address</div>
            <div>
              <input type="email" placeholder={guests[0].email} />
            </div>

            <div>Any dietary restrictions?</div>
            <div>
              <input placeholder="eg. gluten-free, vegan, allergic to nuts" />
            </div>

            <div>Song Request (title, artist)</div>
            <div>
              <input />
            </div>

            <div>Notes</div>
            <div>
              <input />
            </div>

            <div>
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
      );
    }
  };

  render() {
    const { loading } = this.state;

    return loading ? (
      <div className="content flex">
        Loading...
      </div>
    ) : (
      this.renderPage()
    );
  }
}
