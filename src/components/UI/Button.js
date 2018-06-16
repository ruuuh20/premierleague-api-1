import React from 'react';

const Button = (props) => (
  <button className="button" onClick={props.clicked}>{props.children}</button>

)

export default Button;
