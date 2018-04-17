import React from 'react';
import logo from './logo.svg';

const header = ({ children = '' }) => {
  return(
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to Planetarium</h1>
      { children }
    </header>
  );
};

export default header;