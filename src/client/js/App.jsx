import React from 'react';

import Home from './Home';

import { Router, IndexRoute, Route, Link } from 'react-router'

export default class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <Route path="/">
          <IndexRoute component={Home}/>
          <Route path="*" component={FourOFour}/>
        </Route>
      </Router>
    )
  }
}
