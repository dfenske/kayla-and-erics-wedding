import React from "react";
import RSVPCodeForm from "./RSVPCodeForm";
import storage from "localforage";

export class RegistryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, cookie: "" };
  }
  componentWillMount = () => {
    storage.getItem("rsvpcode").then(code => {
      if (code) {
        this.setState({
          loading: false,
          cookie: code
        });
      } else {
        this.setState({
          loading: false
        });
      }
    });
  };

  refreshPage = () => {
    storage.getItem("rsvpcode")
      .then(cookie => {
        if (cookie) {
          this.setState({
            cookie,
            loading: false
          });
      } else {
        this.setState({
          loading: false
        })
      }
    });
  };

  renderPage() {
    const { cookie } = this.state;
    
    if (!cookie) {
      return <RSVPCodeForm refreshPage={this.refreshPage} />;
    } else {
      return (
        <div className="content">
          <h1>Registry</h1>
          <div>This is the registry page. Coming soon...</div>
        </div>
      );
    }
  }
  
  render() {
    const { loading } = this.state;

    return loading ? (
      <div className="content flex loading">
        <i className="icon-animate-spin icon-spin" />
      </div>
    ) : (
      this.renderPage()
    );
  }
}
