import React, { Component } from 'react';

class Fixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixtures: []
    }
  }

  componentDidMount() {
    const token = '44caba9c4c56410185f1561dfed18948'
    fetch('https://api.football-data.org//v1/competitions/445/fixtures',  {
      headers: { 'X-Auth-Token': token },
    }
  ).then(res => res.json()).then(json => {
    let fixtures = json.fixtures.map((fixture) => {
      return (
        <div key={fixture.id}>
        <h3>
        {fixture.matchDay} - {fixture.homeTeamName} vs. {fixture.awayTeamName}
        </h3>
        </div>
      )
    })
  // console.log(json);
    this.setState({
      fixtures: fixtures
    })


  }

  )
  }

  render() {
    return (
      <div className="container">
      {this.state.fixtures}
      </div>
    )
  }
}

export default Fixtures;
