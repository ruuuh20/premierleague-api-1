import React from 'react';
import './TeamWrapper.css'

const TeamWrapper = props => {
  return (
    <div className="team-wrapper">
    {props.children}
    </div>
  )
}

export default TeamWrapper
