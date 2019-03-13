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
          () => this.getGuests()
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
        }, () => this.getGuests()
        );
      } else {
        this.setState({
          loading: false
        });
      }
    });
  };

  getGuests = () => {
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
    const { cookie, guests } = this.state;

    if (!cookie) {
      return <RSVPCodeForm refreshPage={this.refreshPage} />;
    } else {
      let table = this.state.loading ? (
        <p>
          <em><i className="icon-animate-spin icon-spin" /></em>
        </p>
      ) : (
        this.renderGuestsTable(guests)
      );

      return (
        <div className="content">
          <a href="/notes">Notes page</a>
          <hr />
          {guests && (
            <div className="totals">
              <div>
                Total Attending:{" "}
                {guests.filter(g => g.willAttend).length}
              </div>
              <div>
                Total Not Attending:{" "}
                {guests.filter(g => g.willAttend === false).length}
              </div>
              <div>
                Total Unknown:{" "}
                {guests.filter(g => g.willAttend === null).length}
              </div>
            </div>
          )}
          {table}
        </div>
      );
    }
  }
}
