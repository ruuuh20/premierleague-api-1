import React, { Component } from 'react';
import './NewsFeed.css'

class NewsFeed extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      recentNewsPost: {
        name: '',
        url: ''
      }
    }
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
  }

  render() {
    const teamnews = this.state.teams.map(team => {
      return <div className="news-box">
          Check out recent news about: <a target="_blank" href={team.strRSS}>{team.strTeam}</a>
      </div>
    })

    return (
      <div>
    {teamnews}
    </div>
    );
  }
}

export default NewsFeed
