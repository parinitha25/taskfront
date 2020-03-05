import React, { Component } from 'react';
import '../App.css';
import { logout} from '../action/events.action';
import { successAlertHandler,failureAlertHandler } from '../action/alert.action';
import { connect } from 'react-redux';
import { Button} from 'reactstrap';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }
  toggle=()=>{
    this.setState({
        isOpen: !this.state.isOpen,
    });
  }


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
          </ul>       
          <Button onClick={this.logout}>{this.onClick ? 'Login' : 'Logout'}</Button>
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