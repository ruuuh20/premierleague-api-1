import React from 'react';
import './Team.css'

const Team = (props) => (
  <div className="team" onClick={props.teamClicked}>
    <h3>{props.name}</h3>

  </div>
)

export default Team;
