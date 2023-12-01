// UserInput.js
import React from 'react';
import './UserInput.scss';

const UserInput = ({ className, type, placeholder, onChange }) => {
  return (
    <input
      className={`userInput ${className}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default UserInput;
