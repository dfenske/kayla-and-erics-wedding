import React, { Component } from "react";
import storage from "localforage";
export class RSVPPage extends Component {
  constructor(props) {
    super(props);
    this.state = { guests: [], loading: true, cookie: '', code: ''};
  }

  componentWillMount = () => {
    Promise.all([
      storage.getItem('rsvpcode'),
      fetch("api/guests/all")
    ])
    .then(([res1, res2]) => Promise.all([res1, res2.json()]))
    .then(([data1, data2]) => {
      this.setState({
        cookie: data1,
        guests: data2,
        loading: false
    })});
  };

  submit = (e) => {
    e.preventDefault();
    storage.setItem('rsvpcode', this.state.code)
      .then(() => {
        this.setState({ cookie: this.state.code });
      });
  }

  changeCode = (e) => {
    this.setState({
      code: e.target.value
    });
  }
  renderSelect = () => {
    return (
      <select>
        {this.state.guests.map(g => (
          <option key={g.firstName} value={g.firstName}>
            {g.firstName} {g.lastName}
          </option>
        ))}
      </select>
    );
  };

  render() {
    const { cookie } = this.state;

    let select = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderSelect()
    );

    if (cookie) {
      return (
        <div className="content rsvp">
          <h1>RSVP</h1>
          <form>
            <div>Your Name</div>
            <div>{select}</div>

            <div>Are you able to attend?</div>
            <div className="switch">
              <label>
                Unfortunately, no
                <input defaultChecked={true} type="checkbox" />
                <span className="lever" />
                Yes, I'll be there!
              </label>
            </div>

            <div>Email Address</div>
            <div>
              <input type="email" />
            </div>

            <div>Phone Number</div>
            <div>
              <input type="tel" placeholder="(xxx) xxx-xxxx" />
            </div>

            <div>Notes</div>
            <div>
              <input />
            </div>

            <div>Any dietary restrictions?</div>
            <div>
              <input placeholder="eg. gluten-free, vegan, allergic to nuts" />
            </div>

            <div>Song Request (title, artist)</div>
            <div>
              <input />
            </div>

            <div>
              <button className="btn">Submit</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="content rsvp">
          <h1>RSVP</h1>
          <div>
            <form>
              <div>
                Please enter your RSVP code (find it on your invitation)
              </div>
              <input className="center" onChange={this.changeCode} />
              <button onClick={this.submit} className="btn btn-info">Submit</button>
            </form>
          </div>
        </div>
      );
    }
  }
}
