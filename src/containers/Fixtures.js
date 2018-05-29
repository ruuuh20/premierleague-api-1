import React, { Component } from 'react';
import axios from 'axios';
import './fixtures.css'
import Fixture from '../components/Fixture'

class Fixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixtures: []
    }
  }

  componentDidMount() {
    const token = '44caba9c4c56410185f1561dfed18948'
  //   fetch('https://api.football-data.org//v1/competitions/445/fixtures',  {
  //     headers: { 'X-Auth-Token': token },
  //   }
  // ).then(res => res.json()).then(json => {
  //   let fixtures = json.fixtures.map((fixture) => {
  //     return (
  //       <div key={fixture.id}>
  //       <h3>
  //       {fixture.matchDay} - {fixture.homeTeamName} vs. {fixture.awayTeamName}
  //       </h3>
  //       </div>
  //     )
  //   })
  //
  //   this.setState({
  //     fixtures: fixtures
  //   })
  //
  //
  // }
  //
  // )

  axios.get('https://api.football-data.org//v1/competitions/445/fixtures', { headers: { 'X-Auth-Token': token }})
    .then(response =>  {
      // console.log(response.data.fixtures)
      this.setState({
        fixtures: response.data.fixtures
      })
    })
    .catch((error) => {
        console.log('error ' + error);
      });
  }

  render() {
    const fixtures = this.state.fixtures.map(fixture => {
      return <Fixture key={fixture.id} homeTeamName={fixture.homeTeamName} />
      console.log(fixture.title)
    })

    return (
      <div className="fixtures">
      {fixtures}
      </div>
    )
  }
}

export default Fixtures;
