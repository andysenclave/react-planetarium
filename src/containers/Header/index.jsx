import React, { Component } from 'react';
import { connect } from 'react-redux';

import './header.css';
import logo from './logo.svg';
import { searchPlanets } from '../../store/actions/planets';
import SearchBar from '../../components/searchBar';

const mapStateToProps = (state) => ({
  planets: state.planets
});

const dispatchToProps = (dispatch) => ({
   searchPlanets: (name) => dispatch(searchPlanets(name))
});

class Header extends Component {
  
  componentDidMount() {
   this.props.searchPlanets('ta');
  }

  render () {
    return(
      <header className="app-header">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="app-title">Welcome to Planetarium</h1>
        <SearchBar />
      </header>
    );
  }
};

export default connect(mapStateToProps, dispatchToProps)(Header);