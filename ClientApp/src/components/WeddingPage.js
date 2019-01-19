import React, { Component } from 'react';
import RSVPCodeForm from './RSVPCodeForm';
import storage from "localforage";

export class WeddingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, cookie: ''};
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
        <div className="content narrow">
          <h2><i className="glyphicon glyphicon-map-marker" /> Location</h2>
          <p>Eric's mom is generously hosting the wedding at her home! Since there is limited space on the property for parking, below are instructions for where to park and how the shuttle system will work.</p>
          <h4><i className="glyphicon glyphicon-road" /> Parking</h4>
          <p>For folks driving to the wedding, there is ample parking in the Bueche's grocery store parking lot. If you need help arranging a ride, please let us know.</p>
          <div className="flex-column">
            <p>400 N. Ortonville, Rd.</p>
            <p>Ortonville, MI 48462</p>
          </div>
          <p>We will have a scheduled shuttle leaving every 15 minutes from the parking lot to take guests to the house. In the evening, the shuttle will be available on demand to take guests back to theur cars.</p>
          <p>For guests staying in one of the below recommended accommodations we will schedule two shuttles to depart from the hotels and bring you to the wedding if you do not wish to rent a car.</p>
          <h2><i className="glyphicon glyphicon-time" /> Schedule</h2>
          <p>4:00 photos</p>
          <p>5:00 ceremony</p>
          <p>6:00 cocktail hour</p>
          <p>7:00 introductions</p>
          <p>7:45 dinner</p>
          <p>8:45 toasts</p>
          <p>9:00 cake cutting</p>
              <p>9:15 dance floor opens</p>
          <h2><i className="glyphicon glyphicon-plane" /> Flights</h2>
              <p>For those flying to Michigan, there are two options:</p>
              <p><b>Flint/Bishop - FNT</b> airport is about 20 minutes from Ortonville, a nice small airport, and close to Grand Blanc where our recommended hotels are located.</p>
              <p><b>Detroit - DTW</b> airport is an international hub with many non-stop flights. It is about 1 hour from Ortonville, but for those wishing to extend their stay or explore the city, this is a great option.</p>
          <h2><i className="glyphicon glyphicon-home" /> Guest Accommodations</h2>
          <p>Here are a couple suggested hotels that are between the Flint airport and the wedding location.</p>
          <ul>
            <li><a href="https://www.ihg.com/holidayinnexpress/hotels/us/en/grand-blanc/fntgb/hoteldetail?cm_mmc=GoogleMaps-_-EX-_-US-_-FNTGB">Holiday Inn Express & Suites Grand Blanc</a></li>
            <li><a href="https://www.wyndhamhotels.com/wingate/grand-blanc-michigan/wingate-by-wyndham-flint-grand-blanc/overview?CID=LC:WG::GGL:RIO:National:10974&iata=00065402">Wingate by Wyndham Flint/Grand Blanc</a></li>
            <li><a href="https://www.choicehotels.com/michigan/grand-blanc/quality-inn-hotels/mi319?source=gyxt">Quality Inn</a></li>
          </ul>
          <h2><i className="glyphicon glyphicon-cutlery" /> Where to Eat/Drink</h2>
          <ul>
            <li><b>The Woodshop</b> is a nearby restaurant that Eric worked at for a time. It is known for its BBQ and wood fired pizzas. It also has a host of local beers on tap.</li>
            <li><b>Essence on Main</b> is a boutique shop and deli run by our close family friends. It is right next door to The Woodshop and is a great option for local food and gifts.</li>
          </ul>
          <h2><i className="glyphicon glyphicon-camera" /> Things to Do</h2>
          <p>If you are planning on spending some extra time in the area before or after the wedding, there are some great things to see in, especially this time of year.</p>
          <ul>
            <li><b>Detroit</b> has a few places to check out while you're in town. It is about an hour drive from the wedding location. This time of year is perfect for a sports fan, as the Lions(NFL), Tigers(MLB), Red Wings(NHL) and Pistons(NBA) are all in season. Walking along the river front from the Renaissance Center to Hart Plaza or checking out Eastern Market are other cool options.</li>
            <li><b>Frankenmuth</b> is a beautiful Bavarian town with good restaurants and delicious fudge.</li>
            <li>Checking out <b>Grand Rapids</b> or <b>Mackinac Island</b> would be worthwhile day trips for the beer or fudge enthusiast.</li>
          </ul>
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
