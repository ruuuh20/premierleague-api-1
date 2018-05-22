import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';


class Modal extends Component {

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
    if (this.state.redirect) {
   return <Redirect push to="/home" />;
    }
    return (
      <div className="front">
        <div className="front-box">
        <h1>Premier League</h1>
        </div>
        <div className="front-box2">
        <button onClick={this.handleClick}>Enter</button>

        </div>
      </div>
    )
  }
}

export default Modal;
