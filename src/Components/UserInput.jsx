// UserInput.js
import React from 'react';
import './UserInput.scss';

const UserInput = ({ type, placeholder, onChange }) => {
  return (
    <input
      className="userInput"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default UserInput;
