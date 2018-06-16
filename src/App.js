import React, { Component } from 'react';

import './App.css';
import Background from './components/Background'
import Modal from './components/Modal'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './containers/Home'
import Fixtures from './containers/Fixtures'
import Main from './containers/Main'

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
      <Route path="/" component={Main} />
      </div>
      </Router>
    );
  }
}

export default App;
