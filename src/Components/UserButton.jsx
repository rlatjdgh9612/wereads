// UserButton.js
import React from 'react';
import './UserButton.scss';

const UserButton = ({ text, onClick }) => {
  return (
    <button className="userButton" onClick={onClick}>
      {text}
    </button>
  );
};

export default UserButton;
