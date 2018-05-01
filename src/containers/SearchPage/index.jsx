import React, { Component } from 'react';
import { connect } from 'react-redux';

import './search.css';
import logo from './logo.svg';
import { resetTimer, searchPlanets, startTimer } from '../../store/actions/search';
import SearchBar from '../../components/searchBar';

const mapStateToProps = (state) => ({
  planets: state.planets,
  user: state.user,
  search: state.search
});

const mapDispatchToProps = (dispatch) => ({
   resetTimer: () => dispatch(resetTimer()),
   searchPlanets: (name) => dispatch(searchPlanets(name)),
   startTimer: () => dispatch(startTimer())   
});

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planetName: '',
      searchExpanded: true,
      ...props
    };
    this.handleAnimation = this.handleAnimation.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.searchCounter = '';
  }

  handleSearch(value) {
    const { planetName, search: { searchTimerStarted } } = this.state;
    const { resetTimer } = this.props;
    if(value !== 'submit') {
      this.setState({ planetName: value });
    } else {
      if(!searchTimerStarted) {
        this.props.startTimer();
        this.searchCounter = setInterval(() => {
          resetTimer();
        }, 60000, resetTimer);
      }
      this.props.searchPlanets(planetName);
    }
  }

  handleAnimation(event) {
    if(typeof event !== undefined) {
      const { type, target: { value } } = event;
      const { appHeader, textContent } = this.refs;
      const { searchExpanded } = this.state;
      console.log(type,',',value.length);
      if(type === 'click' && searchExpanded) {
        appHeader.className = appHeader.className.concat(' folded');
        textContent.className = textContent.className.concat(' folded');
        this.setState({
          searchExpanded: !searchExpanded
        });
      } else if(type === 'blur' && value.length === 0) {
        appHeader.className = appHeader.className.replace(' folded', '');
        textContent.className = textContent.className.replace(' folded', '');
        this.setState({
          searchExpanded: !searchExpanded
        });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.searchCounter)
  }

  render () {
    const { planetName, searchExpanded, user } = this.state;
    const searchBarClass = searchExpanded ? '' : 'expanded';

    return(
      <div className="app">
        <header ref="appHeader" className="app-header">
          <section ref="textContent" className="text-content">
            <img src={logo} className="logo" alt="logo" />
            <h1 className="app-title">Hey { user.name || '' }!</h1>
            <h1 className="app-title">Welcome to Planetarium</h1>
          </section>
          <div onKeyPress={(e) => {
              if(e.key === 'Enter') this.handleSearch('submit');
            }
          }>
            <SearchBar 
              className={searchBarClass}
              value={planetName}
              onChange={value => this.handleSearch(value)}
              onClick={value => this.handleAnimation(value)}
              onBlur={value => this.handleAnimation(value)}
            />
          </div>
        </header>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);