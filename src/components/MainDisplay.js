import React, { Component } from 'react';
import './MainDisplay.css'
import axios from 'axios'

class MainDisplay extends Component {
  state = {
    teamInfo: null
  }

  componentDidUpdate() {
//if id is valid
    if (this.props.id) {
      if (!this.state.teamInfo || (this.state.teamInfo && this.state.teamInfo.idTeam != this.props.id)) {
          axios.get('https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=' + this.props.id)
            .then(response => {
              // console.log(response.data.teams[0])
              this.setState({
                teamInfo: response.data.teams[0]
              })
            })
          }
    }

  }


  render() {
    let teamPage = <p>Hello</p>
    if (this.props.id) {
      teamPage = <p>Loading</p>
    }
    if (this.state.teamInfo) {
      teamPage = (
        <div>
          <h1> {this.state.teamInfo.strTeam}</h1>

        </div>
      )
    }

    return (
      <div className="main-display">
        {teamPage}
      </div>
    )


  }


}

export default MainDisplay;
