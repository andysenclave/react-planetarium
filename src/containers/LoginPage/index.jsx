import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/user';

const mapDispatchToProps = (dispatch) => ({
   loginUser: (loginData) => dispatch(loginUser(loginData))
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  async handleSubmit(e) {
    e.preventDefault();
    const successLogin = await this.props.loginUser(this.state);
    if(successLogin) this.props.history.push('/search');
  }
  handleInputChange(e) {
    e.preventDefault();
    let update = {};
    
    if(e.target.id === 'username') update = { username: e.target.value };
    if(e.target.id === 'password') update = { password: e.target.value };
    this.setState(update);
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="username-row">
          <label htmlFor="username">Enter Username</label>
          <input type="text" id="username" value={this.state.username} onChange={this.handleInputChange}/>
        </div>
        <div className="password-row">
          <label htmlFor="password">Enter Password</label>
          <input autoComplete="Enter Password" type="password" id="password" value={this.state.password} onChange={this.handleInputChange}/>
        </div>
        <div className="submit-row">
          <input type="submit" value="Login"/>
        </div>
      </form>
    );
  }
};

export default connect(null, mapDispatchToProps)(LoginPage);