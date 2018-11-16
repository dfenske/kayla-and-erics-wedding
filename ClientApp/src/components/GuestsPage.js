import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'

export class GuestsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guests: [],
      loading: true
    };

    fetch('api/guests/all')
      .then(response => response.json())
      .then(data => {
        this.setState({ guests: data, loading: false });
      });
  }

  renderGuestsTable = (guests) => {
    if (guests) {
      return (
        <ReactTable
          data={guests}
          columns={[
            {
              Header: "Id",
              accessor: "id"
            },
            {
              Header: "First Name",
              accessor: "firstName"
            },
            {
              Header: "LastName",
              accessor: "lastName"
            },
            {
              Header: "RSVP Code",
              accessor: "rsvpCode"
            },
            {
              Header: "Response",
              id: "willAttend",
              accessor: g => g.willAttend ? <span style={{color: 'green'}}>{`\u2714`}</span> : <span style={{color: 'red'}}>{`\u2717`}</span>
            },
            {
              Header: "Email",
              accessor: "email"
            },
            {
              Header: "Whose",
              id: "eOrK",
              accessor: g => g.eOrK === 'E' ? 'Eric' : 'Kayla'
            }
          ]}
          defaultPageSize={100}
          className="-striped -highlight"
        />
      );
    } else {
      return null;
    }
  }

  render() {
    let table = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderGuestsTable(this.state.guests);

    return (
      <div className="content">
        <h1>Guests</h1>

        {this.state.guests &&
          <div className="totals">
            <div>Total Attending: {this.state.guests.filter(g => g.willAttend).length}</div>
            <div>Total Not Attending: {this.state.guests.filter(g => g.willAttend === false).length}</div>
            <div>Total Unknown: {this.state.guests.filter(g => g.willAttend === null).length}</div>
          </div>
        }
        {table}
      </div>
    );
  }
}
