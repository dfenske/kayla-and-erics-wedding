import React, { Component } from 'react';

export class RSVPPage extends Component {

  constructor(props) {
    super(props);
    this.state = { guests: [], loading: true };
  }

  componentWillMount = () => {
    fetch('api/guests/all')
      .then(response => response.json())
      .then(data => {
        this.setState({ guests: data, loading: false });
      });
  }

  renderSelect = () => {
    return (
      <select>
        {this.state.guests.map(g => 
            <option key={g.firstName} value={g.firstName} >{g.firstName} {g.lastName}</option>
        )}
      </select>
    );
  }

  render() {
    let select = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderSelect();

    return (
      <div className="content narrow">
        <h2>RSVP</h2>
        <form>
          <div>Your Name</div>
          <div>
            {select}
          </div>

          <div>Are you able to attend?</div>
          <div className="switch">
            <label>
              Unfortunately, no
              <input defaultChecked={true} type="checkbox" />
              <span className="lever"></span>
              Yes, I'll be there!
            </label>
          </div>

          <div>Email Address</div>
          <div><input type="email" /></div>

          <div>Phone Number</div>
          <div><input type="tel" placeholder="(xxx) xxx-xxxx" /></div>

          <div>Notes</div>
          <div><input /></div>

          <div>Any dietary restrictions?</div>
          <div><input placeholder="eg. gluten-free, vegan, allergic to nuts" /></div>

          <div>Song Request (title, artist)</div>
          <div><input /></div>

          <div><button className="btn">Submit</button></div>
        </form>
      </div>
    );
  }
}
