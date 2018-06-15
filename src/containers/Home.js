import React, { Component } from 'react';
import TeamsList from '../components/TeamsList';
import Fixtures from './Fixtures'
import './Home.css'
import FixtureInfo from '../components/FixtureInfo'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    }
  }


  render() {
    return (
      <div className="home">
        <h1>Fixtures 2017/2018</h1>
        <Fixtures />
        <section>
          <FixtureInfo id={this.state.selectedId}/>
        </section>

      </div>
    )
  }
}


export default Home;
