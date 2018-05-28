import React, { Component } from 'react';

import './App.css';
import Background from './components/Background'
import Modal from './components/Modal'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './containers/Home'

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
        <div className="container">
        
        </div>
        <Modal redirect={this.state.redirect} onclick={this.handleClick}/>
      <Route path="/home" component={Home} />
      </div>
      </Router>
    );
  }
}

export default App;
