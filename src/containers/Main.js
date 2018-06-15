import React, { Component } from 'react';
import './Main.css'
import MainDisplay from '../components/MainDisplay'
import axios from 'axios';
import Team from '../components/Team'
import TeamSection from '../components/TeamSection'

class Main extends Component {
  state = {
    teams: [],
    teamId: null

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

  handleTeamClick = (id) => {
    this.setState({
      teamId: id
    })
  }

  render() {
    const teams = this.state.teams.map(team => {
      return <Team
        key={team.idTeam}
        name={team.strTeam}
        teamClicked={() => this.handleTeamClick(team.idTeam)}
        />
      }

    )
    return (
      <div>

        <section>
        {teams}
        </section>
        <section>
          <MainDisplay id={this.state.teamId}/>
          </section>
      </div>
    )
  }
}

export default Main;
