// UserInput.js
import React from 'react';
import './UserInput.scss';

const UserInput = ({ type, placeholder }) => {
  return <input className="userInput" type={type} placeholder={placeholder} />;
};

export default UserInput;
