import React from 'react';
import './TeamButton.css'

class TeamButton extends React.Component {   
    constructor(){
    super(); 
    this.state = {
        color_black: true,
      }
    }
    changeColor(){
        this.setState({color_black: !this.state.color_black})
    }

        render(){
        let bgColor = this.state.color_black ? this.props.color : this.props.color2

        return (
      
            <button className="team-button"
                    style={{backgroundColor: bgColor}} 
                    onClick={this.changeColor.bind(this)}>{this.props.children}
            </button>

      )
    }
}

export default TeamButton;