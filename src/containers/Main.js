import React, { Component } from 'react';
import './Main.css'
import MainDisplay from '../components/MainDisplay'
import axios from 'axios';
import Team from '../components/Team'

class Main extends Component {
  state = {
    teams: []

  }

  componentDidMount() {
    axios.get('https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League')
      .then(response => {
        // console.log(response.data.teams)
        this.setState({
          teams: response.data.teams
        })
      })

  }

  render() {
    const teams = this.state.teams.map(team => {
      return <Team name={team.strTeam} />
    }

    )
    return (
      <div>
        <MainDisplay />

        {teams}



      </div>
    )
  }
}

export default Main;
