import React, { Component } from 'react';
import './fixture.css'

const fixture = (props) => (
  <article className="fixture">
    <h1>{props.homeTeamName}</h1>
    <h4>vs.</h4>
    <h1>{props.awayTeamName}</h1>
    <div className="info">
      <div>Author</div>
    </div>
  </article>
)

export default fixture;
