import React, { Component } from 'react';
import './MainDisplay.css'
import axios from 'axios';
import TeamWrapper from './TeamWrapper';
import Button from './UI/Button';
import logo from '../images/Premier_League_Logo.svg';

class MainDisplay extends Component {

  state = {
      load: false,
      id: null,
      team: {},
      squad: [] //[{1},{2}]
  };


baseState = this.state

componentWillReceiveProps = (nextProps) => {
  if (this.state.id != null && this.state.id != nextProps.id) {
    this.setState({
      id: nextProps.id
    })
  }
}

  componentDidUpdate() {
//if id is valid
    if (this.props.id) {
        axios.get(`https://api.football-data.org/v2/teams/${this.props.id}`, {
          headers: {
            'x-auth-token': process.env.REACT_APP_API_KEY
          }
        })
        
            .then(teamRes => {
              this.setState({
                  team: teamRes.data,
                  
              })
            })
          
    }
  }

  render() {
    let classes = [];
    let squads = ""


    let teamPage = (
      <div className="row main-row">
        <h1>Welcome to the Premier League.</h1>
      </div>
    )

    if (this.props.id) {
      teamPage = <p>Loading</p>
      // squads = this.state.squad[0]

    //   squads = {this.state.team.squad.map(s => {
    //     return (
    //       <div className="squad-list" key={s.id}>
    //         <p>{s.name} - {s.position}</p>
    //       </div>
    //     )
    //   })
    // }
  }

  const team = this.state.team
    

    if (this.props.id) {
      teamPage = (
        <div className={classes}>
        <div className="page-row">

          <div className="row">
          
              <div className="badge">
                <img src={team["crestUrl"]} alt="Badge" />
                <p>{team["name"]}</p>
                <p>Stadium: {team["stadium"]}</p>
              </div>
      
            
         
           
          </div>

        </div>
        </div>
      )
    }

  
return (
  <div> {teamPage}

 
  </div>
)
    

} }

export default MainDisplay;
