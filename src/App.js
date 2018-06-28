import React, { Component } from 'react';

import './App.css';
import Background from './components/Background'
import Modal from './components/Modal'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './containers/Home'
import Fixtures from './containers/Fixtures'
import Main from './containers/Main';
import NewsFeed from './containers/NewsFeed';
import Navbar from './components/Navbar';

class App extends Component {

  state = {
    redirect: false
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      redirect: true
    });
  }

  render() {
    return (
      <Router>
      <div>
      <Navbar />
      <Route path="/" exact component={Main} />
      <Route path="/news" exact component={NewsFeed} />
      <Route path="/fixtures" exact component={Fixtures} />
      </div>
      </Router>
    );
  }
}

export default App;
