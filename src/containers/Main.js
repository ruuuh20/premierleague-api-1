import React, { Component } from 'react';
import './Main.css'
import MainDisplay from '../components/MainDisplay'
import axios from 'axios';
import Team from '../components/Team'
import TeamSection from '../components/TeamSection'

const old_url = 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League'

const new_url = 'https://api.football-data.org/v2/competitions/2021/teams'

// const token = '44caba9c4c56410185f1561dfed18948'
class Main extends Component {
  state = {
    teams: [],
    teamId: null,
    isFirstPage: null,
  }

  componentDidMount() {
    axios.get(new_url, {
      headers: {
        'x-auth-token': process.env.REACT_APP_API_KEY
      }
    })
      .then(response => {
        this.setState({
          teams: response.data.teams
        })
      })
  }

  handleTeamClick = (id) => {

    this.setState({
      teamId: id,
      isFirstPage: true,
    
    })

  }

  render() {
    console.log(this.state.teams)
    const teams = this.state.teams.map(team => {
      return <Team
        key={team.id}
        className={team.name}
        name={team.shortName}
        teamClicked={() => this.handleTeamClick(team.id)}
        />
      }

    )
    return (
      <div class="full-container">
        <section className="team-top left column">
        {teams}
        </section>
        <section className="bottom right column">
          <MainDisplay id={this.state.teamId} isFirstPage={this.state.isFirstPage} />
        </section>

      </div>
    )
  }
}

export default Main;
