import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import RSVPCodeForm from "./RSVPCodeForm";
import storage from "localforage";

export class GuestsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: [],
      loading: true,
      cookie: ""
    };
  }

  componentWillMount = () => {
    storage.getItem("rsvpcode").then(code => {
      if (code === "fendan") {
        this.setState({
          cookie: code
        },
          () => this.fetch()
        );
      } else {
        this.setState({
          loading: false
        });
      }
    });
  };

  refreshPage = () => {
    storage.getItem("rsvpcode").then(cookie => {
      if (cookie === "fendan") {
        this.setState({
          cookie
        }, () => this.fetch()
        );
      } else {
        this.setState({
          loading: false
        });
      }
    });
  };

  fetch = () => {
    fetch("api/guests/all")
      .then(response => response.json())
      .then(data => {
        this.setState({ guests: data, loading: false });
      });
  }

  renderGuestsTable = guests => {
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
              accessor: g =>
                g.willAttend === true ? (
                  <span style={{ color: "green" }}>{`\u2714`}</span>
                ) : g.willAttend === false ? (
                  <span style={{ color: "red" }}>{`\u2717`}</span>
                ) : ''
            },
            {
              Header: "Email",
              accessor: "email"
            },
            {
              Header: "Whose",
              id: "eOrK",
              accessor: g => (g.eOrK.startsWith("E") ? "Eric" : g.eOrK.startsWith("K") ? "Kayla" : "")
            }
          ]}
          defaultPageSize={100}
          className="-striped -highlight"
        />
      );
    } else {
      return null;
    }
  };

  render() {
    const { cookie } = this.state;

    if (!cookie) {
      return <RSVPCodeForm refreshPage={this.refreshPage} />;
    } else {
      let table = this.state.loading ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        this.renderGuestsTable(this.state.guests)
      );

      return (
        <div className="content">
          <h1>Guests</h1>

          {this.state.guests && (
            <div className="totals">
              <div>
                Total Attending:{" "}
                {this.state.guests.filter(g => g.willAttend).length}
              </div>
              <div>
                Total Not Attending:{" "}
                {this.state.guests.filter(g => g.willAttend === false).length}
              </div>
              <div>
                Total Unknown:{" "}
                {this.state.guests.filter(g => g.willAttend === null).length}
              </div>
            </div>
          )}
          {table}
        </div>
      );
    }
  }
}
