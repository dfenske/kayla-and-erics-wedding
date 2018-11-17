import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div className="content">
            <h2>Our Story</h2>
            <p>For those of you that don't yet know our unique story, it began on Sept. 30, 2014 when Kayla walked into the downtown Seattle AT&T store to buy a new cell phone with her dad. Eric came over to assist this new customer and soon discovered he was helping a fellow soccer fan and lover of all things Italian. Over the next 4 years, a strong friendship and love grew between us. We provide each other a tremendous amount of support and entertainment and frequently go on adventures together all over the world. We could not be more excited for this next step in our lives together and look forward to celebrating it with all of you.</p>
            <div>
                <img src="images/Eric  Kayla 019.jpg" width="100%" alt="erickayla" />
            </div>
      </div>
    );
  }
}
