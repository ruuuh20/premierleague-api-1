import React, { Component } from 'react';
import './NewsFeed.css'
import NewsDisplay from './NewsDisplay'
import axios from 'axios'

class NewsFeed extends Component {
  constructor() {
    super();
    this.state = {
      value: 'Arsenal',
      data: [],
      teams: [],
      recentNewsPost: {
        name: '',
        url: ''
      }
    }
  }

 //  fetchNews() {
 //    var url = 'https://newsapi.org/v2/everything?' +
 //          'q=Apple&' +
 //          'from=2018-06-21&' +
 //          'sortBy=popularity&' +
 //          'apiKey=a8ed41904cde47078c992fe104f12f44';
 //
 //    axios.get(url, {
 //      headers: {
 //        'Accept': 'application/json',
 //             'Content-Type': 'application/json',
 // }
 //    })
 //        .then(function(response) {
 //            console.log(response.data);
 //        })
 //  }

  FetchDataFromRssFeed() {
    var result;
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        var myObj = JSON.parse(request.responseText);
        for (var i = 0; i < myObj.teams.length; i ++) {
          this.setState({
            teams: myObj.teams
            // recentNewsPost: {
            //   name: myObj.teams[i].strTeam,
            //   url: myObj.teams[i].strRSS
            // }
          });
          // result =  (
          //   <div>
          //     Check out recent news about: <a target="_blank" href={this.state.recentNewsPost.url}>{this.state.recentNewsPost.name}</a>
          //   </div>
          // )

        }
      }
    }
    request.open("GET", "https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League", true);
    request.send();
  }

  componentDidMount() {
    {this.FetchDataFromRssFeed()}
    // {this.fetchNews()}
  }

  handleChange = (event) => {
      this.setState({ value: event.target.value });

  }

  render() {
    const teamnews = this.state.teams.map(team => {
      return <div className="news-box" onClick={this.handleBadgeClick}>
          <img src={team.strTeamBadge} />
      </div>
    })


    return (
      <div className="logos-container">
        <div className="news">
          <h3>Check out recent headlines:</h3>
          <select value={this.state.value} onChange={this.handleChange}>
            {this.state.teams.map((outlet, i) => {
              return (
                <option key={i} value={outlet.id}>
                  {outlet.strTeam}
                </option>
              );
            })}
          </select>
        </div>
          {teamnews}
    <NewsDisplay default={this.state.value} />
    </div>
    );
  }
}

export default NewsFeed
