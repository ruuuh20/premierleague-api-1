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
              console.log(teamRes)
              this.setState({
                  name: teamRes.data.name,
                  short: teamRes.data.shortName,
                  badge: teamRes.data.crestUrl,
                  stadium: teamRes.data.venue
              })
            })
          
    }
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
    

    if (this.props.id) {
      teamPage = (
        <div className={classes}>
        <div className="page-row">

          <div className="row">
            <div className="column">
              <h3>{this.state.name}</h3>
            </div>
            <div className="badge">
                <img src={this.state.badge} alt="Badge"/>
            </div>
          </div>

            <div className="next-row">
  
              <h3>{this.state.short}</h3>
           
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
