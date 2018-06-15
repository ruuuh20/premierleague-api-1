import React, { Component } from 'react';
import './fixture.css'

const fixture = (props) => (



  <article className="fixture" onClick={props.clicked}>
    <h1>{props.homeTeamName}</h1>
    <p>vs.</p>
    <h1>{props.awayTeamName}</h1>
    <div className="info">
      <div>{props.status}</div>
    </div>
  </article>
)

export default fixture;
