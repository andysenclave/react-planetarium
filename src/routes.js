import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginPage from './containers/LoginPage';
import SearchPage from './containers/SearchPage';
import Header from './components/header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main className="container">
          <Header />
          <Route exact path='/' component={LoginPage}/>  
          <Route exact path='/search' component={SearchPage}/>
        </main>
      </BrowserRouter>
    );
  }
};

export default App;