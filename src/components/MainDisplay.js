import React, { Component } from "react";
import "./MainDisplay.css";
import axios from "axios";
import TeamWrapper from "./TeamWrapper";
import Button from "./UI/Button";
import logo from "../images/Premier_League_Logo.svg";

class MainDisplay extends Component {
  state = {
    load: false,
    id: null,
    team: {}
  };

  componentWillReceiveProps = nextProps => {
    if (this.state.id != null && this.state.id != nextProps.id) {
      this.setState({
        id: nextProps.id
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    //if id is valid
    if (prevProps.id !== this.props.id) {
      axios
        .get(
          `https://api-football-v1.p.rapidapi.com/v2/teams/team/${this.props.id}`,
          {
            headers: {
              "X-RapidAPI-Key": process.env.REACT_APP_API_KEY
            }
          }
        )
        .then(teamRes => {
          this.setState({
            team: teamRes.data.api.teams[0]
          });
        });
    }
  }

  render() {
    let classes = [];

    let teamPage = (
      <div className="row main-row">
        <h1>Welcome to the Premier League.</h1>
      </div>
    );

    const team = this.state.team;

    if (this.props.id) {
      teamPage = (
        <div className={classes}>
          <div className="page-row">
            <div className="row">
              <div className="badge">
                <img src={team["logo"]} alt="Badge" />
                <p>{team["name"]}</p>
                <br />
                <hr />
              </div>
              <br />
              <div className="more-info">
                <span> Stadium: {team["venue_name"]}</span>
                <br />
                <br />
                <span> City: {team["venue_city"]}</span>
                <br />
                <br />
                <span>
                  <a href={team["website"]}>Official Website</a>
                </span>
              </div>
              <div className="competitions">
                <h4>Current Active Competitions:</h4>
                {!this.state.team.activeCompetitions
                  ? "loading"
                  : this.state.team.activeCompetitions.map(s => (
                      <div className="comp-list" key={s.id}>
                        <span>{s.name}</span> |{" "}
                        <span className="pos">{s.area.name}</span>
                        <br />
                        <br />
                      </div>
                    ))}
              </div>
              <h4>Squad:</h4>
              <div className="squad-wrapper">
                {!this.state.team.squad
                  ? "loading"
                  : this.state.team.squad.map(s => (
                      <div className="squad-list" key={s.id}>
                        <span>{s.name}</span> |{" "}
                        <span className="pos">{s.position}</span>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div>{teamPage}</div>;
  }
}

export default MainDisplay;
