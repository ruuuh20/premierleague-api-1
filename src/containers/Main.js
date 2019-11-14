import React, { Component } from "react";
import "./Main.css";
import MainDisplay from "../components/MainDisplay";
import axios from "axios";
import Team from "../components/Team";
import logo from "../images/Premier_League_Logo.svg";

const new_url = "https://api-football-v1.p.rapidapi.com/v2/teams/league/524";

// const token = '44caba9c4c56410185f1561dfed18948'
class Main extends Component {
  state = {
    teams: [],
    teamId: null,
    isFirstPage: null
  };

  componentDidMount() {
    console.log(process.env);
    axios
      .get(new_url, {
        headers: {
          // 'x-auth-token': process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY
        }
      })
      .then(response => {
        this.setState({
          teams: response.data.api.teams
        });
        console.log(response.data.api.teams);
      });
  }

  handleTeamClick = id => {
    this.setState({
      teamId: id,
      isFirstPage: true
    });
  };

  render() {
    const teams = this.state.teams.map(team => {
      return (
        <Team
          key={team.team_id}
          className={team.name}
          name={team.name}
          teamClicked={() => this.handleTeamClick(team.team_id)}
        />
      );
    });
    return (
      <div className="full-container">
        <section className="team-top left column">
          <object
            className="top-logo"
            align="right"
            type="image/svg+xml"
            data={logo}
          ></object>
          {teams}
        </section>
        <section className="bottom right column">
          <MainDisplay
            id={this.state.teamId}
            isFirstPage={this.state.isFirstPage}
          />
        </section>
      </div>
    );
  }
}

export default Main;
