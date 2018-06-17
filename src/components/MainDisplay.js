import React, { Component } from 'react';
import './MainDisplay.css'
import axios from 'axios';
import TeamWrapper from './TeamWrapper'
import Button from './UI/Button'

class MainDisplay extends Component {
  state = {
    teamInfo: null,
    firstPage: {
      name: null,
      manager: null,
      alternate: null,
      badge: null
    },
    isSecondPage: false,
    secondPage: {
      stadium: null,
      stadiumLocation: null
    },
    isThirdPage: false,
    thirdPage: {
      player1: null,
      player2: null
    }

  };

  componentDidUpdate() {
//if id is valid
    if (this.props.id) {
      if (!this.state.teamInfo || (this.state.teamInfo && this.state.teamInfo.idTeam != this.props.id)) {
        axios.all([
          axios.get('https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=' + this.props.id),
          axios.get('https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=' + this.props.id)
        ])
            .then(axios.spread((teamRes, playerRes) => {
              // console.log(playerRes.data.player[0].strPlayer)
              this.setState({
                teamInfo: teamRes.data.teams[0],
                firstPage: {
                  name: teamRes.data.teams[0].strTeam,
                  manager: teamRes.data.teams[0].strManager,
                  alternate: teamRes.data.teams[0].strAlternate,
                  badge: teamRes.data.teams[0].strTeamBadge
                },
                isSecondPage: false,
                thirdPage: {
                  player1: playerRes.data.player[0].strPlayer,
                  player2: playerRes.data.player[1].strPlayer
                }

              })
            }))
          }
    }
  }

  clickToNext = () => {
    this.setState({
        isSecondPage: true,
        secondPage: {
          stadium: this.state.teamInfo.strStadium,
          stadiumLocation: this.state.teamInfo.strStadiumLocation
        }
    })
  }

  clickToThird = () => {
    this.setState({
        isSecondPage: false,
        isThirdPage: true
    })
  }

  render() {

    let classes = [];

      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Arsenal') {
      classes.push('Arsenal')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Bournemouth') {
      classes.push('Bournemouth')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Brighton') {
      classes.push('Brighton')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Burnley') {
      classes.push('Burnley')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Chelsea') {
      classes.push('Brighton')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Crystal Palace') {
      classes.push('Crystal-Palace')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Everton') {
      classes.push('Everton')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Huddersfield Town') {
      classes.push('Huddersfield-Town')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Leicester') {
      classes.push('Leicester')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Liverpool') {
      classes.push('Liverpool')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Man City') {
      classes.push('Manchester-City')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Man United') {
      classes.push('Man-United')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Newcastle') {
      classes.push('Newcastle')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Southampton') {
      classes.push('Southampton')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Stoke') {
      classes.push('Stoke')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Swansea') {
      classes.push('Swansea')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Tottenham') {
      classes.push('Tottenham')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Watford') {
      classes.push('Watford')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'West Brom') {
      classes.push('West-Brom')
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'West-Ham') {
      classes.push('West-Ham')
    }


    let teamPage = (
      <div className="row main-row">
      <h3>Want to sound smart about the Premier League?</h3>
      <h3>You can learn the basics and join the conversation.</h3>
      <h3>Pick a team!</h3>
      </div>
    )

    if (this.props.id) {
      teamPage = <p>Loading</p>
    }
    let second = ""
    if (this.state.isSecondPage === true) {

      second = (
        <div className={classes}>
        <div className="page-row">
        <div className="row">

            <h1>Stadium: {this.state.secondPage.stadium}</h1>

          <div className="next-row">
              <h1>Location: {this.state.secondPage.stadiumLocation}</h1>
          </div>
        </div>
        <Button clicked={this.clickToThird}>Tell me more!</Button>
        </div>
        </div>
      )
    }

    let third = ""
    if (this.state.isThirdPage === true) {
      third = (
        <div>
        <h1>Hello</h1>
        </div>
      )
    }

    let alternate = ""
    if (this.state.teamInfo && this.state.teamInfo.strAlternate) {
      alternate = "Also referred to as " + this.state.firstPage.alternate
    }
    if (this.props.id) {
      teamPage = (
        <div className={classes}>
        <div className="page-row">

          <div className="row">
            <div className="column">
              <h2>{this.state.firstPage.name}</h2>
            </div>
            <div className="column">
                <img src={this.state.firstPage.badge} alt=""/>
            </div>
          </div>

            <div className="next-row">
              <h1>{alternate}</h1>
              <h1>Manager: {this.state.firstPage.manager}</h1>
            </div>

            <Button clicked={this.clickToNext}>Tell me more!</Button>
        </div>
        </div>
      )
    }

    // {this.state.isSecondPage === true ? <div>{second}</div> :<div>{teamPage}</div>}
    // {(this.state.isThirdPage === true && this.state.isSecondPage === false) ? :<div></div>}

    if (this.state.isThirdPage === true) {
      return (
        <div>{third}</div>
      )
    }; if (this.state.isSecondPage === true) {
      return (
        <div>{second}</div>
      )
    } 
    else {
      return (
        <div>{teamPage}</div>
      )
    }


} }

export default MainDisplay;
