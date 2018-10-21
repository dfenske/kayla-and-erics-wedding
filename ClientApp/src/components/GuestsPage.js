import React, { Component } from 'react';

export class GuestsPage extends Component {

  constructor(props) {
    super(props);
    this.state = { guests: [], loading: true };

    fetch('api/guests/all')
      .then(response => response.json())
      .then(data => {
        this.setState({ guests: data, loading: false });
      });
  }

  static renderGuestsTable(guests) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Response</th>
            <th>Number in Party</th>
          </tr>
        </thead>
        <tbody>
          {guests.map(guest =>
            <tr key={guest.dateFormatted}>
              <td>{guest.firstName}</td>
              <td>{guest.lastName}</td>
              <td>{guest.address}</td>
              <td>{guest.response === true ? 'Attending' : 'Will not attend'}</td>
              <td>{guest.numInParty}</td>
            </tr>
          )}
        </tbody>
        </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : GuestsPage.renderGuestsTable(this.state.guests);

    return (
      <div className="content">
        <h1>Guests</h1>
        {contents}
      </div>
    );
  }
}
