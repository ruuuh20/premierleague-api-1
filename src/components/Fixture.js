import React, { Component } from 'react';
import './fixture.css'

const fixture = (props) => (
  <article className="fixture">
    <h1>{props.homeTeamName}</h1>
    <div className="info">
      <div>Author</div>
    </div>
  </article>
)

export default fixture;
