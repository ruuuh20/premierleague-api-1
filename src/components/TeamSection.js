import React from 'react';
import Team from './Team';
// import './TeamSection.css';

const TeamSection = props => (
  <div className="container">
    {props.teams}
  </div>
)

export default TeamSection
