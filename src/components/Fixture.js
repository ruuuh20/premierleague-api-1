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
    <div className="fixture" onClick={props.clicked}>
    <span>{props.homeTeamName}</span>
      <p>{formatDate(date)}</p>
    <span>{props.awayTeamName}</span>
    <div className="info">
      <div>{formatDate(date)}</div>
    </div>
  </div>
  )

  
}

export default fixture;
