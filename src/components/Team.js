import React from 'react';
import './Team.css'

const Team = (props) => (
  <div className="team" onClick={props.teamClicked}>
    <h4>{props.name}</h4>

  </div>
)

export default Team;
