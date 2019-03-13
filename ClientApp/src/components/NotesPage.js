import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import RSVPCodeForm from "./RSVPCodeForm";
import storage from "localforage";

export class NotesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      loading: true,
      cookie: ""
    };
  }

  componentWillMount = () => {
    storage.getItem("rsvpcode").then(code => {
      if (code.toUpperCase() === "FENDAN") {
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
      if (cookie.toUpperCase() === "FENDAN") {
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
    fetch("api/guests/notes")
      .then(response => response.json())
      .then(data => {
        this.setState({ notes: data, loading: false });
      });
  }

  renderNotesTable = notes => {
    if (notes) {
      return (
        <ReactTable
          data={notes}
          columns={[
            {
              Header: "Dietary",
              accessor: "dietary"
            },
            {
              Header: "Songs",
              accessor: "songs"
            },
            {
              Header: "Notes",
              accessor: "notes"
            },
            {
              Header: "RsvpCode",
              accessor: "rsvpCode"
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
    const { cookie, notes } = this.state;

    if (!cookie) {
      return <RSVPCodeForm refreshPage={this.refreshPage} />;
    } else {
      let table = this.state.loading ? (
        <p>
          <em><i className="icon-animate-spin icon-spin" /></em>
        </p>
      ) : (
        this.renderNotesTable(notes)
      );

      return (
        <div className="content">
          {table}
        </div>
      );
    }
  }
}
