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
 

  };


}

baseState = this.state

// componentWillReceiveProps = (nextProps) => {
//   if (this.props.id != nextProps.id) {
//     this.setState({
//       isThirdPage: false
//     })
//   }
// }

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
                isSecondPage: false
         

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





  render() {

    let classes = [];


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
              <h3>{this.state.firstPage.name}</h3>
            </div>
            <div className="badge">
                <img src={this.state.firstPage.badge} alt=""/>
            </div>
          </div>

            <div className="next-row">
              <h3>{alternate}</h3>
              <h3>{short}</h3>
              <h3>Manager: {this.state.firstPage.manager}</h3>
            </div>

            <Button clicked={this.clickToNext}>Tell me more</Button>
        </div>
        </div>
      )
    }
if (this.state.isSecondPage === true) {
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
