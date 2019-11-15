import React, { Component } from "react";
import "./MainDisplay.css";
import axios from "axios";
import TeamWrapper from "./TeamWrapper";
import Button from "./UI/Button";
import logo from "../images/Premier_League_Logo.svg";

// let x = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${this.props.id}`;
// let y = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${this.props.id}`;

// const requestOne = axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${this.props.id}`);
// const requestTwo = axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${this.props.id}`);
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

  // componentDidUpdate(prevProps, prevState) {
  //   //if id is valid
  //   if (prevProps.id !== this.props.id) {
  //     axios
  //       .get(
  //         `https://api-football-v1.p.rapidapi.com/v2/teams/team/${this.props.id}`,
  //         {
  //           headers: {
  //             "X-RapidAPI-Key": process.env.REACT_APP_API_KEY
  //           }
  //         }
  //       )
  //       .then(teamRes => {
  //         this.setState({
  //           team: teamRes.data.api.teams[0]
  //         });
  //       });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   //if id is valid
  //   if (prevProps.id !== this.props.id) {
  //     axios
  //       .get(
  //         `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${this.props.id}`
  //       )
  //       .then(teamRes => {
  //         this.setState({
  //           team: teamRes.data.teams[0]
  //         });
  //       });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    //if id is valid
    if (prevProps.id !== this.props.id) {
      axios
        .all([
          axios.get(
            `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${this.props.id}`
          ),
          axios.get(
            `https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${this.props.id}`
          )
        ])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            this.setState({
              team: responseOne.data.teams[0],
              squad: responseTwo.data.player
            });
          })
        )
        .catch(errors => {
          console.log(errors);
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
                <img src={team["strTeamBadge"]} alt="Badge" />
                <p>{team["strTeam"]}</p>
                <br />
                <hr />
              </div>
              <br />
              <div className="more-info">
                <span> Stadium: {team["strStadium"]}</span>
                <br />
                <br />
                <span> Location: {team["strStadiumLocation"]}</span>
                <br />
                <br />
                <span>
                  <a href={team["strWebsite"]}>Official Website</a>
                </span>
              </div>

              <h4>Squad:</h4>
              <div className="squad-wrapper">
                {!this.state.squad
                  ? "loading"
                  : this.state.squad.map(s => (
                      <div className="squad-list" key={s.id}>
                        <span>
                          {s.strCutout ? <img src={s.strCutout}></img> : ""}
                        </span>
                        <span>{s.strPlayer}</span> |{" "}
                        <span className="pos">{s.strPosition}</span>
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
