import React, { Component } from 'react';
import './fixture.css'

const fixture = (props) => {

  const formatDate = (date) => {
    var objDate = new Date(date),
    locale = "en-us",
    month = objDate.toLocaleString(locale, { month: "short" });
    console.log(objDate)
    // return month

    var time = new Date(date);
    var year = time.getFullYear();
    var day = time.getDate();
    console.log(time)
   
    // var month = time.getMonth() + 1;
    var composedTime =
    month + " " + day + " " + year
   
  
    return composedTime;
  }

  const date = props.date

  return (
    <div className="fixture" onClick={props.clicked}>
      <span className="GameCellTable">
        <span className="GameCellTableCell GameCellSide1">{props.homeTeamName}</span>
        <span className="GameCellTableCell GameCellScore">vs</span>
        <span className="GameCellTableCell GameCellSide2">{props.awayTeamName}</span>
        <div className="info">
          <div>{formatDate(date)}</div>
        </div>
      </span>
  </div>
  )

  
}

export default fixture;
