import React, { Component } from "react";
import RSVPCodeForm from "./RSVPCodeForm";
import storage from "localforage";

export class RSVPPage extends Component {
  constructor(props) {
    super(props);
    this.state = { guests: [], loading: true, guestData: [], cookie: "", message: '', songRequest: '', diet: '' };
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

  changedDiet = (e) => {
    this.setState({ diet: e.target.value });
  }

  changedSongRequest = (e) => {
    this.setState({ songRequest: e.target.value });
  }

  changedMessage = (e) => {
    this.setState({ message: e.target.value });
  }

  changedRadio = (guestId, response) => {
    const { guestData } = this.state;
    
    const newGuestData = JSON.parse(JSON.stringify(guestData));

    // check if guestid already exists, overwrite
    const index = newGuestData.findIndex(g => g.guestId === guestId);
    if (index !== -1) {
      newGuestData[index].response = response;
    } else {
      // otherwise, add
      newGuestData.push({ guestId, response });
    }

    this.setState({ guestData: newGuestData });
  }

  changedEmail = (guestId, email) => {
    const { guestData } = this.state;
    
    const newGuestData = JSON.parse(JSON.stringify(guestData));

    // check if guestid already exists, overwrite
    const index = newGuestData.findIndex(g => g.guestId === guestId);
    if (index !== -1) {
      newGuestData[index].email = email;
    } else {
      // otherwise, add
      newGuestData.push({ guestId, email });
    }

    this.setState({ guestData: newGuestData });
  }

  submit = (e) => {
    e.preventDefault();

    fetch('api/guests/update', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(data => data.json())
    .then(res => {
      this.setState({ success: res });
    })
  }

  renderPage = () => {
    const { cookie, guests, success } = this.state;

    if (!cookie) {
      return <RSVPCodeForm refreshPage={this.refreshPage} />;
    } else if (success) {
      return (
        <div className="content narrow rsvp">
          <h1>RSVP</h1>
          <div className="rsvp-message">
            <h3>Thank you!</h3>
            <div>Your RSVP has been saved. You can update this at any time by visiting this page again.</div>
          </div>
        </div>
      )
    } {
      return (
        <div className="content narrow rsvp">
          <h1>RSVP</h1>
          <form>
            <div>
              <div className="radio-headers">
                <div>Name</div>
                <div>Yes, I'll be there!</div>
                <div>Unfortunately not</div>
                <div>Email (optional)</div>
              </div>
              {guests.map((g, i) => (
                <div key={g.firstName + i} className="radio">
                  <label>{`${g.firstName} ${g.lastName}`}</label>
                  <div>
                  <input
                      type="radio"
                      className="form-radio"
                      name={`${g.firstName} ${g.lastName}`}
                      value="yes"
                      onChange={() => this.changedRadio(g.id, "yes")}
                      defaultChecked={g.willAttend === true}
                    />
                  </div>
                  <div>
                  <input
                      type="radio"
                      className="form-radio"
                      name={`${g.firstName} ${g.lastName}`}
                      value="no"
                      onChange={() => this.changedRadio(g.id, "no")}
                      defaultChecked={g.willAttend === false}
                    />
                  </div>
                  <div>
                  <input
                      type="text"
                      className="form-text"
                      name="email"
                      defaultValue={`${g.email}`}
                      onChange={(e) => this.changedEmail(g.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div><i className="glyphicon glyphicon-apple"/> Any dietary restrictions?</div>
            <div>
              <input placeholder="eg. gluten-free, vegan, allergic to nuts" onChange={this.changedDiet} />
            </div>

            <div><i className="glyphicon glyphicon-music"/> If we only played one song at the reception, what would you want it to be?</div>
            <div>
              <input onChange={this.changedSongRequest} placeholder="eg. Love Shack, The B-52's" />
            </div>

            <div><i className="glyphicon glyphicon-pencil"/> Anything else you want to let us know?</div>
            <div>
              <textarea className="form-control" name="notes" rows="4" onChange={this.changedMessage} ></textarea>
            </div>

            <div>
              <button className="btn btn-success" onClick={this.submit}>Submit</button>
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
        <i className="icon-animate-spin icon-spin" />
      </div>
    ) : (
      this.renderPage()
    );
  }
}
