﻿import React, { Component } from 'react';
import RSVPCodeForm from './RSVPCodeForm';
import storage from "localforage";

export class WeddingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, cookie: '' };
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
          <h4 className="wedding-section">
            We are so incredibly happy and blessed to have such wonderful family and friends to celebrate our special moment with us. For those of you who are coming from out of state or country, we completely understand how difficult it can be to make a trip like this for a short weekend. We hope that the details below will help make the journey easier and more enjoyable for you! If you have any questions that we didn't cover, please do not hesitate to contact us.
          </h4>
          <div className="wedding-section">
            <h2>Location</h2>
            <p>Eric's mom is generously hosting the wedding at her home! The ceremony and reception will be in the backyard, so please dress accordingly (footwear for grass, a sweater when it cools down in the evening, etc.) Since there is limited space on the property for parking, below are instructions for where to park and how the shuttle system will work.</p>
          </div>
          <div className="wedding-section">
            <h2>Parking</h2>
            <p>For folks driving to the wedding, there is ample parking in the Bueche's grocery store parking lot. Please park toward the back of the lot and look for the wedding sign. If you need help arranging a ride, please let us know.</p>
            <div className="flex-column">
              <p>Bueche's Food World</p>
              <p>400 N. Ortonville, Rd.</p>
              <p>Ortonville, MI 48462</p>
            </div>
            <p>We will have a scheduled shuttle leaving every 15 minutes from the parking lot to take guests to the house. In the evening, the shuttle will be available to take guests back to their cars.</p>
            <p>Please let us know if you will be staying at one of the hotels listed below and would need a ride to the wedding, we will try to accommodate everyone as best we can.</p>
          </div>
          <div className="wedding-section">
            <h2>Schedule</h2>
            <ul>
              <li>5:00 ceremony</li>
              <li>5:30 cocktail hour</li>
              <li>6:00 bridal party arrives</li>
              <li>6:30 toasts</li>
              <li>7:00 dinner</li>
              <li>8:00 first dance</li>
              <li>9:00 cake cutting</li>
              <li>9:15 bouquet/garter toss</li>
              <li>9:30 dance floor opens</li>
            </ul>
          </div>
          <div className="wedding-section">
            <h2>Flights</h2>
            <p>For those flying to Michigan, there are two options:</p>
            <p><b>Flint/Bishop - FNT</b> airport is about 20 minutes from Ortonville, a nice small airport, and close to Grand Blanc where some of our recommended hotels are located.</p>
            <p><b>Detroit - DTW</b> airport is an international hub with many non-stop flights. It is about 1 hour from Ortonville, but for those wishing to extend their stay or explore the city, this is a great option.</p>
          </div>
          <div className="wedding-section">
            <h2>Guest Accommodations</h2>
            <p>For those of you flying into Flint, the hotels below are a 10 minute drive from the airport.</p>
            <ul>
              <li><a href="https://www.ihg.com/holidayinnexpress/hotels/us/en/grand-blanc/fntgb/hoteldetail?cm_mmc=GoogleMaps-_-EX-_-US-_-FNTGB">Holiday Inn Express & Suites Grand Blanc</a></li>
              <li><a href="https://www.wyndhamhotels.com/wingate/grand-blanc-michigan/wingate-by-wyndham-flint-grand-blanc/overview?CID=LC:WG::GGL:RIO:National:10974&iata=00065402">Wingate by Wyndham Flint/Grand Blanc</a></li>
              <li><a href="https://www.choicehotels.com/michigan/grand-blanc/quality-inn-hotels/mi319?source=gyxt">Quality Inn</a></li>
            </ul>
            <p>For those of you flying into Detroit, Auburn Hills is the closest town to Ortonville with chain hotels coming from the south. It is about a 25 minute drive to the wedding and an hour drive from the Detroit airport.</p>
            <ul>
              <li><a href="https://www.marriott.com/hotels/travel/dtwta-towneplace-suites-detroit-auburn-hills/">TownePlace Suites by Marriott</a></li>
              <li><a href="https://www.ihg.com/holidayinnexpress/hotels/us/en/auburn-hills/dttbr/hoteldetail?cm_mmc=GoogleMaps-_-EX-_-US-_-DTTBR">Holiday Inn Express & Suites Auburn Hills</a></li>
              <li><a href="https://hamptoninn3.hilton.com/en/hotels/michigan/hampton-inn-detroit-auburn-hills-north-great-lakes-crossing-area-DTTNAHX/index.html?SEO_id=GMB-HP-DTTNAHX">Hampton Inn Detroit/Auburn Hills-North (Great Lakes Crossing Area)</a></li>
            </ul>
          </div>
          <div className="wedding-section">

            <h2>Where to Eat/Drink</h2>
            <ul>
              <li><b>The Woodshop</b> is a nearby restaurant that Eric worked at for a time. It is known for its BBQ and wood fired pizzas. It also has a host of local beers on tap.</li>
              <li><b>Essence on Main</b> is a boutique shop and deli run by our close family friends. It is right next door to The Woodshop and is a great option for local food and gifts.</li>
            </ul>
          </div>
          <div className="wedding-section">
            <h2>Things to Do</h2>
            <p>If you are planning on spending some extra time in the area before or after the wedding, there are some great things to see in, especially this time of year.</p>
            <ul>
              <li><b>Detroit</b> has a few places to check out while you're in town. It is about an hour drive from the wedding location. This time of year is perfect for a sports fan, as the Lions(NFL), Tigers(MLB), Red Wings(NHL) and Pistons(NBA) are all in season. Walking along the river front from the Renaissance Center to Hart Plaza or checking out Eastern Market are other cool options.</li>
              <li><b>Frankenmuth</b> is a beautiful Bavarian town with good restaurants and delicious fudge.</li>
              <li>Checking out <b>Grand Rapids</b> or <b>Mackinac Island</b> would be worthwhile day trips for the beer or fudge enthusiast.</li>
            </ul>
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
