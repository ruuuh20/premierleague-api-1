import React, { Component } from 'react';
import './MainDisplay.css'
import axios from 'axios';
import TeamWrapper from './TeamWrapper';
import Button from './UI/Button';
import logo from '../images/PL.jpg'

class MainDisplay extends Component {
  constructor(props) {
    super(props);

  this.state = {
    teamInfo: null,
    isFirstPage: this.props.isFirstPage,
    firstPage: {
      name: null,
      manager: null,
      alternate: null,
      short: null,
      badge: null
    },
    isSecondPage: false,
    secondPage: {
      stadium: null,
      stadiumLocation: null,
      jersey: null
    },
    isThirdPage: false,
    thirdPage: {
      player1: null,
      player2: null
    }

  };


}

baseState = this.state

componentWillReceiveProps = (nextProps) => {
  if (this.props.id != nextProps.id) {
    this.setState({
      isThirdPage: false
    })
  }
}

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
                  short: teamRes.data.teams[0].strTeamShort,
                  badge: teamRes.data.teams[0].strTeamBadge
                },
                isSecondPage: false,
                thirdPage: {

                  player1: '',
                  player2: ''
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
          stadiumLocation: this.state.teamInfo.strStadiumLocation,
          jersey: this.state.teamInfo.strTeamJersey
        }
    })
  }

  clickToThird = () => {
    this.setState({
        isSecondPage: false,
        isThirdPage: true,
        isFirstPage: false
    })
  }

  componentWillUnmount() {
    this.setState({
      isThirdPage: false
    })
  }

  render() {

    let classes = [];

      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Arsenal') {
      classes.push('Arsenal');
      this.state.thirdPage.player1 = 'Jack Wilshere'
      this.state.thirdPage.player2 = 'Mesut Özil'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Bournemouth') {
      classes.push('Bournemouth');
      this.state.thirdPage.player1 = 'Joshua King'
      this.state.thirdPage.player2 = 'Nathan Aké'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Brighton') {
      classes.push('Brighton');
      this.state.thirdPage.player1 = 'Matthew Ryan (GK)'
      this.state.thirdPage.player2 = 'José Izquierdo (F)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Burnley') {
      classes.push('Burnley');
      this.state.thirdPage.player1 = 'Nick Pope (GK)'
      this.state.thirdPage.player2 = 'Jóhann Berg Guðmundsson (MF)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Chelsea') {
      classes.push('Chelsea');
      this.state.thirdPage.player1 = 'Eden Hazard (F)'
      this.state.thirdPage.player2 = 'Willian (F)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Crystal Palace') {
      classes.push('Crystal-Palace');
      this.state.thirdPage.player1 = 'Christian Benteke (F)'
      this.state.thirdPage.player2 = 'Wilfried Zaha (F)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Everton') {
      classes.push('Everton');
      this.state.thirdPage.player1 = 'Wayne Rooney (F)'
      this.state.thirdPage.player2 = 'Cenk Tosun (f)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Huddersfield Town') {
      classes.push('Huddersfield-Town');
      this.state.thirdPage.player1 = 'Aaron Mooy (MF)'
      this.state.thirdPage.player2 = 'Ramadan Sobhi (F)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Leicester') {
      classes.push('Leicester');
      this.state.thirdPage.player1 = 'Jamie Vardy (F)'
      this.state.thirdPage.player2 = 'Riyad Mahrez (MF)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Liverpool') {
      classes.push('Liverpool');
      this.state.thirdPage.player1 = 'Mo Salah (F)'
      this.state.thirdPage.player2 = 'Sadio Mané (F)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Man City') {
      classes.push('Manchester-City');
      this.state.thirdPage.player1 = 'Sergio Agüero (F)'
      this.state.thirdPage.player2 = 'David Silva (MF)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Man United') {
      classes.push('Man-United');
      this.state.thirdPage.player1 = 'Paul Pogba (MF)'
      this.state.thirdPage.player2 = 'David de Gea (GK)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Newcastle') {
      classes.push('Newcastle');
      this.state.thirdPage.player1 = 'Kenedy (MF)'
      this.state.thirdPage.player2 = 'Jonjo Shelvey (MF)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Southampton') {
      classes.push('Southampton');
      this.state.thirdPage.player1 = 'Dušan Tadić (MF)'
      this.state.thirdPage.player2 = 'Maya Yoshida (D)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Wolves') {
      classes.push('Wolves');

      this.state.thirdPage.player1 = 'Rúben Neves (MF)'
      this.state.thirdPage.player2 = 'Raúl Jiménez (F))'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Fulham') {
      classes.push('Fulham');
      this.state.thirdPage.player1 = 'Aleksandar Mitrović (F)'
      this.state.thirdPage.player2 = 'Ryan Sessegnon (MF)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Tottenham') {
      classes.push('Tottenham');
      this.state.thirdPage.player1 = 'Harry Kane (F)'
      this.state.thirdPage.player2 = 'Son Heung-min (F)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Watford') {
      classes.push('Watford');
      this.state.thirdPage.player1 = 'Richarlison (F)'
      this.state.thirdPage.player2 = 'Troy Deeney (F)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'Cardiff') {
      classes.push('Cardiff')

      this.state.thirdPage.player1 = 'Aron Gunnarsson (MF)'
      this.state.thirdPage.player2 = 'Marko Grujić (MF)'
    }
      if (this.state.teamInfo && this.state.teamInfo.strTeam === 'West Ham') {
      classes.push('West-Ham');
      this.state.thirdPage.player1 = 'Javier Hernández (F)'
      this.state.thirdPage.player2 = 'Issa Diop (D)'
    }


    let teamPage = (
      <div className="row main-row">

      <h3></h3>
      <img src={logo} />
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
        <Button clicked={this.clickToThird}>Tell me more</Button>
        </div>
        </div>
      )
    }

    let third = ""
    if (this.state.isThirdPage === true) {
      third = (
        <div className={classes}>
        <div className="page-row">
        <div className="row">
          <div className="column">
            <h1>Players to know:</h1>
              <p>{this.state.thirdPage.player1}</p>
              <p>{this.state.thirdPage.player2}</p>
          </div>
          <div className="column">
              <img className="jersey" src={this.state.secondPage.jersey} />
          </div>
        </div>
        </div>
        </div>
      )
    }

    let alternate = ""
    if (this.state.teamInfo && this.state.teamInfo.strAlternate) {
      alternate = "Also referred to as " + this.state.firstPage.alternate
    }
    let short=""
    if (this.state.teamInfo && this.state.teamInfo.strTeamShort) {
      short = "Short: " + this.state.firstPage.short
    }
    if (this.props.id) {
      teamPage = (
        <div className={classes}>
        <div className="page-row">

          <div className="row">
            <div className="column">
              <h2>{this.state.firstPage.name}</h2>
            </div>
            <div className="badge">
                <img src={this.state.firstPage.badge} alt=""/>
            </div>
          </div>

            <div className="next-row">
              <h1>{alternate}</h1>
              <h1>{short}</h1>
              <h1>Manager: {this.state.firstPage.manager}</h1>
            </div>

            <Button clicked={this.clickToNext}>Tell me more</Button>
        </div>
        </div>
      )
    }

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
