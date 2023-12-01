// UserButton.js
import React from 'react';
import './UserButton.scss';

const UserButton = ({ className, text, onClick, disabled }) => {
  return (
    <button
      className={`userButton ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default UserButton;
