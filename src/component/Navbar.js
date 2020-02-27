import React, { Component } from 'react';
import '../App.css';
import { logout} from '../action/events.action';
import { successAlertHandler,failureAlertHandler } from '../action/alert.action';
import { connect } from 'react-redux';

class Navbar extends Component {
  
  logout = () => {
    const { logout, successAlertHandler, failureAlertHandler } = this.props
    const { history } = this.props;
    logout()
      .then(resp => {
        successAlertHandler(resp);
        sessionStorage.removeItem("token")
        history.push('/');
      })
      .catch(error => {
        failureAlertHandler(error);
        sessionStorage.removeItem("token")
      })
  }

  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-sm navbar-light bg-info navbar">
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <a className="nav-link nav-heading " href="./event">Events</a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-heading" href="./admin">Admin</a>
          </li>
          </ul>       
          <a className="nav-link nav-heading" href="./">Login</a>
          <a className="nav-link nav-heading" href="./signup">Signup</a>
          <button className="logout"  onClick={this.logout}>Logout</button>
        </div>
        </nav>
      </div>
    );
  }
}

const actions = {
  logout,
  successAlertHandler,
  failureAlertHandler
}

export default connect(null,actions)(Navbar)