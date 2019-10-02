import React, { Component } from 'react';
import axios from 'axios';
import './fixtures.css'
import Fixture from '../components/Fixture';
import FixtureInfo from '../components/FixtureInfo';
import Modal from '../components/Modal';
import TeamButton from './TeamButton'


// { headers: 
//   { 'X-Auth-Token': token,
//   'Access-Control-Allow-Methods': "GET",
//   'Access-Control-Allow-Origin': "*"
//  }}

class Fixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixtures: [],
      fixture: null,
      selectedId: null,
      showModal: false,
      bgColor: "",
     
    }
  }


  componentDidMount() {
    const token = '44caba9c4c56410185f1561dfed18948'
    const old_url = 'https://api.football-data.org//v1/competitions/445/fixtures'
    const new_url = 'https://api.football-data.org/v2/competitions/2021/matches'
    let x = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328'

  axios.get(new_url, {
     headers: 
  { 
    'x-auth-token': token
  // 'Access-Control-Allow-Methods': "GET",
  // 'Access-Control-Allow-Origin': "*",
  //     'Access-Control-Allow-Headers': "x-auth-token, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
 },
  })
    .then(response =>  {
      console.log(response)

        // const fixtures = response.data.slice(0, 10);
      this.setState({
        fixtures: response.data.matches
      })
    })
    .catch((error) => {
        console.log('error ' + error);
      });
  }

  selectedHandler = (fixture) => {
    console.log(fixture)
    this.setState({
      showModal: true,
      fixture: fixture,
      selectedId: fixture.idEvent
    
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  boxClickFirst = (e) => {
    this.setState({
      bgColor: "#C1292E"
    })
  }
  boxClickSecond = (e) => {
    this.setState({
      bgColor: "#C1292E"
    })
  }


  render() {
    const fixtures = this.state.fixtures.map(fixture => {
      return <Fixture key={fixture.idEvent}
          date={fixture.dateEvent}
          
          homeTeamName={fixture.strHomeTeam}
          awayTeamName={fixture.strAwayTeam}
          clicked={() => this.selectedHandler(fixture)}/>

    })

    const gamesArray =[]
    const finishedGames = this.state.fixtures.filter(fixture => {
      fixture.status === "FINISHED"
    })

  for (var i; i < finishedGames.length; i++) {
    gamesArray.push(finishedGames[i])

  }

  let modalContent

  if (this.state.fixture) {

    modalContent = (
      <div className="">
  
        <h2>{this.state.fixture.strEvent}</h2>
        <h2>Who will win?</h2>
     <div className="box-row">
        <TeamButton color="#EDEEEE" color2="#C1292E">{this.state.fixture.strHomeTeam}</TeamButton>
        <TeamButton color="#EDEEEE" color2="#C1292E">{this.state.fixture.strAwayTeam}</TeamButton>
        </div>
      </div>
    )
  } else {
    modalContent = <h2>select a team</h2>
  }


    return (
      <div className="fixtures">
      <Modal show={this.state.showModal} modalClosed={this.handleClose}>
      {modalContent}
      </Modal>
     
        <h1>Next 15 games...</h1>
    
      <div className="fixtures-container">

      {fixtures}
      </div>
        </div>
    )
  }
}

export default Fixtures;
