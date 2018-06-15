import React, { Component } from 'react';
import './MainDisplay.css'

class MainDisplay extends Component {


  render() {
    let teamPage = <p>Hello</p>
    if (this.props.id) {
      teamPage = (
        <div>
          <h1> Title </h1>

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
