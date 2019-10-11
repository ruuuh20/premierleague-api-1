import React, { Component } from 'react';
import './MainDisplay.css'
import axios from 'axios';
import TeamWrapper from './TeamWrapper';
import Button from './UI/Button';
import logo from '../images/PL.jpg';

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
      color2: null
 

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
                  color2: teamRes.data.clubColors.split(' / ')[1]
              })
            })
          
    }
  }

  render() {

    let classes = [];

    let teamPage = (
      <div className="row main-row">
        <h1>Premier <br></br>League</h1>
      <img src={logo} />
      </div>
    )

    if (this.props.id) {
      teamPage = <p>Loading</p>
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
              <h3>{this.state.color1}</h3>
           
            </div>
        </div>
        </div>
      )
    }
return (
  <div> {teamPage}</div >
)
    
  

} }

export default MainDisplay;
