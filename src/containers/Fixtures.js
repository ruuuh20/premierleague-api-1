import React, { Component } from 'react';
import axios from 'axios';

class Fixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixtures: []
    }
  }

  componentDidMount() {
  //   const token = '44caba9c4c56410185f1561dfed18948'
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
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response =>  {
      this.setState({
        fixtures: response.data
      })
    })
  }

  render() {
    const fixtures = this.state.fixtures.map(fixture => {
      return <h1>{fixture.title}</h1>
      // console.log(fixture.title)
    })

    return (
      <div className="container">
      {fixtures}
      </div>
    )
  }
}

export default Fixtures;
