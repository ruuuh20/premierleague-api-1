import React, { Component } from 'react';

import './App.css';
import Background from './components/Background'
import Modal from './components/Modal'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './containers/Home'

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <div className="container">
          <Background />
        </div>
        <Modal />
      <Route path="/home" component={Home} />
      </div>
      </Router>
    );
  }
}

export default App;
