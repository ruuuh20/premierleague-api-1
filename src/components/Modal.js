import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import './Modal.css';
import Backdrop from './UI/Backdrop/Backdrop'


class Modal extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return  nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentWillUpdate () {
    console.log("hello")
  }
  render() {
    return (
      <div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
          <div className="modal"
          style={{
              transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
              opacity: this.props.show ? '1': '0'
          }}>
            {this.props.children}
          </div>
          </div>

    )
  }

}

export default Modal;
