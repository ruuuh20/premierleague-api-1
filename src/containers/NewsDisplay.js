import React, { Component } from 'react';
import './NewsDisplay.css'
import axios from 'axios';

class NewsDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }


  // componentDidMount() {
  //   this.getArticles(this.props.default);
  //   console.log(this.props.default)
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {

      this.setState({
        url: `https://newsapi.org/v2/everything?sources=bbc-sport&q=${
          nextProps.default
        }&sortBy=popularity&apiKey=a8ed41904cde47078c992fe104f12f44`
      });

      this.getArticles(nextProps.default);
    }
  }

  formatDate(date) {
    var time = new Date(date);
    var year = time.getFullYear();
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var month = time.getMonth() + 1;
    var composedTime =
      day +
      '/' +
      month +
      '/' +
      year +
      ' | ' +
      hour +
      ':' +
      (minute < 10 ? '0' + minute : minute);
    return composedTime;
  }

  getArticles(url) {

    axios.get(`https://newsapi.org/v2/everything?sources=bbc-sport&q=${url}&sortBy=popularity&apiKey=a8ed41904cde47078c992fe104f12f44`)
      .then(res => {
        const articles = res.data.articles.slice(0,10);
        this.setState({ articles: articles });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="cardsContainer">
    
        {this.state.articles.map((news, i) => {
          return (
            <div className="card" key={i}>
              <div className="content">
                <h3>
                  <a href={news.url} target="_blank">
                    {news.title}
                  </a>
                </h3>
                <p>{news.description}</p>
                <div className="author">
                  <p>
                    By <i>{news.author ? news.author : "Unknown"}</i>
                  </p>
                  <p>{this.formatDate(news.publishedAt)}</p>
                </div>
              </div>
              <div className="image">
                <img src={news.urlToImage} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default NewsDisplay;
