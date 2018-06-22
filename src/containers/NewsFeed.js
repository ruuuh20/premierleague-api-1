import React, { Component } from 'react';
import './NewsFeed.css'
import Modal from '../components/Modal';
import axios from 'axios'

class NewsFeed extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      recentNewsPost: {
        name: '',
        url: ''
      },
      modaling: false
    }
  }

  handleBadgeClick = () => {
    this.setState({
      modaling: true
    })
  }

  handleClose = () => {
    this.setState({
      modaling: false
    })
  }

  fetchNews() {
    var url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2018-06-21&' +
          'sortBy=popularity&' +
          'apiKey=a8ed41904cde47078c992fe104f12f44';

    axios.get(url, {
      headers: {

        'Accept': 'application/json',
             'Content-Type': 'application/json',

 }
    })
        .then(function(response) {
            console.log(response);
        })
  }

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
    {this.fetchNews()}
  }

  render() {
    const teamnews = this.state.teams.map(team => {
      return <div className="news-box" onClick={this.handleBadgeClick}>
          <img src={team.strTeamBadge} />
      </div>
    })

    const news = <h1>hi</h1>

    return (
      <div>
      <Modal show={this.state.modaling} modalClosed={this.handleClose}>
      {news}
    </Modal>
      <h3>Check out recent news about:</h3>
    {teamnews}
    </div>
    );
  }
}

export default NewsFeed
