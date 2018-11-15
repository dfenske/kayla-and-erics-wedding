import React, { Component } from 'react';

export class GuestsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guests: [],
      loading: true,
      sortedById: null,
      sortedByFirstName: null,
      sortedByLastName: null,
      sortedByRsvpCode: null,
      sortedByResponse: null,
      sortedByEmail: null,
      sortedByWhose: null
    };

    fetch('api/guests/all')
      .then(response => response.json())
      .then(data => {
        this.setState({ guests: data, loading: false });
      });
  }

  sortById = () => {
    const { guests, sortedById } = this.state;
    if (guests) {
      let sortOrder;
      const clone = guests.slice(0);
      if (!sortedById || sortedById === 'desc') {
        clone.sort((a, b) => {
          var x = a.id;
          var y = b.id;
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        sortOrder = 'asc';
      }
      else {
        // forwards sorted
        clone.sort((a, b) => {
          var x = a.id;
          var y = b.id;
          if (x > y) { return -1; }
          if (x < y) { return 1; }
          return 0;
        });
        sortOrder = 'desc';
      }
      this.setState({
        guests: clone,
        sortedById: sortOrder
      });
    }
  }

  sortByFirstName = () => {
    const { guests, sortedByFirstName } = this.state;
    if (guests) {
      let sortOrder;
      const clone = guests.slice(0);
      if (!sortedByFirstName || sortedByFirstName === 'desc') {
        clone.sort((a, b) => {
          var x = a.firstName.toLowerCase();
          var y = b.firstName.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        sortOrder = 'asc';
      }
      else {
        // forwards sorted
        clone.sort((a, b) => {
          var x = a.firstName.toLowerCase();
          var y = b.firstName.toLowerCase();
          if (x > y) { return -1; }
          if (x < y) { return 1; }
          return 0;
        });
        sortOrder = 'desc';
      }
      this.setState({
        guests: clone,
        sortedByFirstName: sortOrder
      });
    }
  }

  sortByLastName = () => {
    const { guests, sortedByLastName } = this.state;
    if (guests) {
      let sortOrder;
      const clone = guests.slice(0);
      if (!sortedByLastName || sortedByLastName === 'desc') {
        clone.sort((a, b) => {
          var x = a.lastName.toLowerCase();
          var y = b.lastName.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        sortOrder = 'asc';
      }
      else {
        // forwards sorted
        clone.sort((a, b) => {
          var x = a.lastName.toLowerCase();
          var y = b.lastName.toLowerCase();
          if (x > y) { return -1; }
          if (x < y) { return 1; }
          return 0;
        });
        sortOrder = 'desc';
      }
      this.setState({
        guests: clone,
        sortedByLastName: sortOrder
      });
    }
  }

  sortByRsvpCode = () => {
    const { guests, sortedByRsvpCode } = this.state;
    if (guests) {
      let sortOrder;
      const clone = guests.slice(0);
      if (!sortedByRsvpCode || sortedByRsvpCode === 'desc') {
        clone.sort((a, b) => {
          var x = a.rsvpCode.toLowerCase();
          var y = b.rsvpCode.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        sortOrder = 'asc';
      }
      else {
        // forwards sorted
        clone.sort((a, b) => {
          var x = a.rsvpCode.toLowerCase();
          var y = b.rsvpCode.toLowerCase();
          if (x > y) { return -1; }
          if (x < y) { return 1; }
          return 0;
        });
        sortOrder = 'desc';
      }
      this.setState({
        guests: clone,
        sortedByRsvpCode: sortOrder
      });
    }
  }

  sortByResponse = () => {
    const { guests, sortedByResponse } = this.state;
    if (guests) {
      let sortOrder;
      const clone = guests.slice(0);
      if (!sortedByResponse || sortedByResponse === 'desc') {
        clone.sort((a, b) => {
          var x = a.willAttend;
          var y = b.willAttend;
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        sortOrder = 'asc';
      }
      else {
        // forwards sorted
        clone.sort((a, b) => {
          var x = a.willAttend;
          var y = b.willAttend;
          if (x > y) { return -1; }
          if (x < y) { return 1; }
          return 0;
        });
        sortOrder = 'desc';
      }
      this.setState({
        guests: clone,
        sortedByResponse: sortOrder
      });
    }
  }

  sortByEmail = () => {
    const { guests, sortedByEmail } = this.state;
    if (guests) {
      let sortOrder;
      const clone = guests.slice(0);
      if (!sortedByEmail || sortedByEmail === 'desc') {
        clone.sort((a, b) => {
          var x = a.email.toLowerCase();
          var y = b.email.toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        sortOrder = 'asc';
      }
      else {
        // forwards sorted
        clone.sort((a, b) => {
          var x = a.email.toLowerCase();
          var y = b.email.toLowerCase();
          if (x > y) { return -1; }
          if (x < y) { return 1; }
          return 0;
        });
        sortOrder = 'desc';
      }
      this.setState({
        guests: clone,
        sortedByEmail: sortOrder
      });
    }
  }

  sortByWhose = () => {
    const { guests, sortedByWhose } = this.state;
    if (guests) {
      let sortOrder;
      const clone = guests.slice(0);
      if (!sortedByWhose || sortedByWhose === 'desc') {
        clone.sort((a, b) => {
          var x = a.eOrK[0];
          var y = b.eOrK[0];
          if (x < y) { return -1; }
          if (x > y) { return 1; }
          return 0;
        });
        sortOrder = 'asc';
      }
      else {
        // forwards sorted
        clone.sort((a, b) => {
          var x = a.eOrK[0];
          var y = b.eOrK[0];
          if (x > y) { return -1; }
          if (x < y) { return 1; }
          return 0;
        });
        sortOrder = 'desc';
      }
      this.setState({
        guests: clone,
        sortedByWhose: sortOrder
      });
    }
  }

  renderGuestsTable = (guests) => {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>ID <i className="fas fa-sort" onClick={this.sortById} /></th>
            <th>First Name <i className="fas fa-sort" onClick={this.sortByFirstName} /></th>
            <th>Last Name <i className="fas fa-sort" onClick={this.sortByLastName} /></th>
            <th>RSVP Code <i className="fas fa-sort" onClick={this.sortByRsvpCode} /></th>
            <th>Response <i className="fas fa-sort" onClick={this.sortByResponse} /></th>
            <th>Email <i className="fas fa-sort" onClick={this.sortByEmail} /></th>
            <th>Whose Guest <i className="fas fa-sort" onClick={this.sortByWhose} /></th>
          </tr>
        </thead>
        <tbody>
          {guests.map(guest =>
            <tr key={guest.firstName + guest.lastName}>
              <td>{guest.id}</td>
              <td>{guest.firstName}</td>
              <td>{guest.lastName}</td>
              <td>{guest.rsvpCode}</td>
              <td>{guest.willAttend === true ? <span style={{ color: 'green' }}>{`\u2714`}</span> : <span style={{ color: 'red' }}>{`\u2717`}</span>}</td>
              <td>{guest.email}</td>
              <td>{guest.eOrK.startsWith('E') ? 'Eric' : 'Kayla'}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let table = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderGuestsTable(this.state.guests);

    return (
      <div className="content">
        <h1>Guests</h1>

        {this.state.guests &&
          <React.Fragment>
          <div className="totals">
            <div>Total Attending: {this.state.guests.filter(g => g.willAttend).length}</div>
            <div>Total Not Attending: {this.state.guests.filter(g => g.willAttend === false).length}</div>
            <div>Total Unknown: {this.state.guests.filter(g => g.willAttend === null).length}</div>
          </div>
          <hr />
        </React.Fragment>
        }
        {table}
      </div>
    );
  }
}
