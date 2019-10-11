import React, { Component } from 'react';
import './MainDisplay.css'
import axios from 'axios';
import TeamWrapper from './TeamWrapper';
import Button from './UI/Button';
import logo from '../images/Premier_League_Logo.svg';

class MainDisplay extends Component {
  constructor(props) {
    super(props);

  this.state = {
      load: false,
      id: null,
      name: null,

      short: null,
      badge: null,
      stadium: null,
      color1: null,  // ["Red", "White"]
      color2: null,
      squad: [] //[{1},{2}]
 

  };


}

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
                  name: teamRes.data.name,
                  short: teamRes.data.shortName,
                  badge: teamRes.data.crestUrl,
                  stadium: teamRes.data.venue,
                  color1: teamRes.data.clubColors.split(' / ')[0],
                  color2: teamRes.data.clubColors.split(' / ')[1],
                  squad: teamRes.data.squad
              })
            })
          
    }
  }

  render() {
    console.log(this.state)

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

      squads = this.state.squad.map(s => {
        return (
          <div className="squad-list">{s.name} - {s.position}</div>
        )
      })
    }
    

    if (this.props.id) {
      teamPage = (
        <div className={classes}>
        <div className="page-row">

          <div className="row">
              <div className="badge">
                <img src={this.state.badge} alt="Badge" />
              </div>
            <div className="column subname">
              <h3>{this.state.name}</h3>
            </div>
           
          </div>

            <div className="next-row">
  
              <h3>{this.state.short}</h3>
              <h3>Stadium: {this.state.stadium}</h3>
           
            </div>
        </div>
        </div>
      )
    }
return (
  <div> {teamPage}
  {squads}
 
  </div>
)
    
  

} }

export default MainDisplay;
