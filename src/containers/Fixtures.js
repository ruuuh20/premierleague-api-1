import React, { Component } from 'react';
import axios from 'axios';
import './fixtures.css'
import Fixture from '../components/Fixture';
import FixtureInfo from '../components/FixtureInfo';
import Modal from '../components/Modal';
import TeamButton from './TeamButton';

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

  getCurrentDate = () => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    return today
  }

  nextweek = () => {
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    return nextweek;
  }

  
  componentDidMount() {
    
    const new_url = `https://api.football-data.org/v2/competitions/2021/matches?status=SCHEDULED&dateFrom=${this.getCurrentDate()}&dateTo=2019-11-30`
    let x = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328'

  axios.get(new_url, {
     headers: 
  { 
    'x-auth-token': process.env.REACT_APP_API_KEY
 },
  })
    .then(response =>  {
   
      this.setState({
        fixtures: response.data.matches
      })
    })
    .catch((error) => {
        console.log('error ' + error);
      });
  }

  selectedHandler = (fixture) => {
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
          date={fixture.utcDate}
          homeTeamName={fixture.homeTeam.name}
          awayTeamName={fixture.awayTeam.name}
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
          <TeamButton color="#EDEEEE" color2="#C1292E">{this.state.fixture.homeTeam.name}</TeamButton>
          <TeamButton color="#EDEEEE" color2="#C1292E">{this.state.fixture.AwayTeam.name}</TeamButton>
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
    
      <div className="fixtures-container">

      {fixtures}
      </div>
        </div>
    )
  }
}

export default Fixtures;
