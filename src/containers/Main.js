import React, { Component } from 'react';
import './Main.css'
import MainDisplay from '../components/MainDisplay'
import axios from 'axios';
import Team from '../components/Team'
import TeamSection from '../components/TeamSection'

function updateState(isThirdPage){
    this.setState({isThirdPage})
}


class Main extends Component {
  state = {
    teams: [],
    teamId: null,
    isFirstPage: false,
    isThirdPage: false

  }


  // toggleChildMenu = () => {
  //      this.setState(state => ({
  //        isThirdPage: !state.isThirdPage
  //      }));
  //   }

  //   updateChild(isThirdPage) {
  //        updateState(isThirdPage)
  //    }
  // componentDidUpdate({
  //   this.toggleChildMenu()
  // })



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
      teamId: id,
      isFirstPage: true,
      isThirdPage: false
    })
    this.updateChild;
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

        <section className="team-top">
        {teams}
        </section>
        <section className="bottom">
          <MainDisplay id={this.state.teamId} isFirstPage={this.state.isFirstPage} isThirdPage={this.state.isThirdPage}/>
        </section>

      </div>
    )
  }
}

export default Main;
