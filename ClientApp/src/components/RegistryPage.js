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
        <div className="content bordered narrow">
          <div className="leaves"><img src="/images/flourish.png" /></div>
          <h2 className="page-title">Registry</h2>
              <div className="registry">
                  <div>We've been together a year or two,</div>
                  <div>we don't really need anything new.</div>
                  <div>Yet if a gift is your intention,</div>
                  <div>we thought that we would mention,</div>
                  <div>we'd love some pennies to put together,</div>
                  <div>to save for our first home that we will treasure.</div>
                  <div>And just remember, what means the most,</div>
                  <div>is that you're with us to raise a toast!</div>
              </div>
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
