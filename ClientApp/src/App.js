import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { WeddingPage } from './components/WeddingPage';
import { RSVPPage } from './components/RSVPPage';
import { GuestsPage } from './components/GuestsPage';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/wedding' component={WeddingPage} />
        <Route path='/rsvp' component={RSVPPage} />
        <Route path='/guests' component={GuestsPage} />
      </Layout>
    );
  }
}
