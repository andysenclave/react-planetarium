import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn
});

class Header extends Component {

  componentWillReceiveProps(newProps) {
    this.checkLogin(newProps);
  }

  componentDidMount(){
    this.checkLogin();
  }

  checkLogin(props = this.props){
    const { location: { pathname } } = props;
    if(!props.loggedIn && pathname !== '/') {
      props.history.push('/');
    }
  }

  render() {
    return (
      <header></header>
    );
  }
}

Header = connect(mapStateToProps, null)(Header);

export default withRouter(Header);