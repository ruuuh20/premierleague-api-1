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
    }
  }

  componentDidUpdate() {
//if id is valid
    if (this.props.id) {
      if (!this.state.teamInfo || (this.state.teamInfo && this.state.teamInfo.idTeam != this.props.id)) {
          axios.get('https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=' + this.props.id)
            .then(response => {
              // console.log(response.data.teams[0])
              this.setState({
                teamInfo: response.data.teams[0],
                firstPage: {
                  name: response.data.teams[0].strTeam,
                  manager: response.data.teams[0].strManager,
                  alternate: response.data.teams[0].strAlternate,
                  badge: response.data.teams[0].strTeamBadge
                },
                isSecondPage: false



              })
            })
          }
    }

  }

  clickToNext = () => {
    console.log("hi")
    this.setState({


        isSecondPage: true,
        secondPage: {
          stadium: this.state.teamInfo.strStadium,
          stadiumLocation: this.state.teamInfo.strStadiumLocation

        }


    })

  }


  render() {
    let teamPage = (
      <div className="row main-row">
      <h2>Want to know just enough to keep a conversation going?</h2>
      <h2>Learn just the basics and further</h2>
      <h2>Pick a team!</h2>
      </div>
    )

    if (this.props.id) {
      teamPage = <p>Loading</p>
    }
    let second = ""
    if (this.state.isSecondPage === true) {

      second = (
        <div className="row">
          <div className="column">
            <h1>Stadium: {this.state.secondPage.stadium}</h1>
          </div>
          <div className="column">
              <h1>{this.state.secondPage.stadiumLocation}</h1>
          </div>


        </div>
      )
    }


    let alternate = ""
    if (this.state.teamInfo && this.state.teamInfo.strAlternate) {
      alternate = "Also referred to as " + this.state.firstPage.name
    }
    if (this.props.id) {
      teamPage = (
        <div className="row">
          <div className="column">
            <h1>hi{this.state.firstPage.name}</h1>
          </div>
          <div className="column">
              <img src={this.state.firstPage.badge} alt=""/>
          </div>

          <div className="next-row">
            <h1>{alternate}</h1>
            <h1>Manager: {this.state.firstPage.manager}</h1>
          </div>

        </div>
      )
    }

    return (
      <div className="main-display">
      <TeamWrapper>
      <div>
      {this.state.isSecondPage === true ? <div>{second}</div> :<div>{teamPage}</div>}


        </div>
        <Button clicked={this.clickToNext}>More</Button>
      </TeamWrapper>
      </div>
    )


  }


}

export default MainDisplay;
