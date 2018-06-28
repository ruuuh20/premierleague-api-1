import React, { Component } from 'react';
import './fixture.css'

const fixture = (props) => {

  const formatDate = (date) => {
    var objDate = new Date(date),
    locale = "en-us",
    month = objDate.toLocaleString(locale, { month: "short" });
    // return month

    var time = new Date(date);
    var year = time.getFullYear();
    var day = time.getDate();
   
    // var month = time.getMonth() + 1;
    var composedTime =
    month + " " + day + " " + year
   
  
    return composedTime;
  }

  const date = props.date

  return (
    <article className="fixture" onClick={props.clicked}>
    <h1>{props.homeTeamName}</h1>
    <p>vs.</p>
    <h1>{props.awayTeamName}</h1>
    <div className="info">
      <div>{formatDate(date)}</div>
    </div>
  </article>
  )

  
}

export default fixture;
