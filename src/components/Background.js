import React, { Component } from 'react';

class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamlogos: []
    }
  }

  componentDidMount() {
    const token = '44caba9c4c56410185f1561dfed18948'
    fetch('https://api.football-data.org/v1/competitions/398/teams',  {
      headers: { 'X-Auth-Token': token },
    }
  ).then(res => res.json()).then(json => {
    let teamlogos = json.teams.map((team) => {
      return (
        <div key={team.code} className="logo-item">
          <img src={team.crestUrl} />
        </div>
      )
    })
    this.setState({
      teamlogos: teamlogos
    })


  }

  )
  }

  render() {
    return (
      <div className="container">
      {this.state.teamlogos}
      </div>
    )
  }
}

export default Background;
