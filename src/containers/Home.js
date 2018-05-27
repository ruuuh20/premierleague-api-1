import React, { Component } from 'react';
import TeamsList from '../components/TeamsList';
import Fixtures from './Fixtures'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    }
  }


  render() {
    return (
      <div>
        <h1>Fixtures 2017/2018</h1>
        <Fixtures />

      </div>
    )
  }
}


export default Home;
