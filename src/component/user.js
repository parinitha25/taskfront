import React, { Component } from 'react';
import '../css/Allcomponent.css';
import { connect } from 'react-redux';
import { successAlertHandler,failureAlertHandler } from '../action/alert.action';

class Userlist extends Component {
    constructor(props) {
      super(props);
      this.state = {   
        listuser:props.userlist
      }     
    } 
   
    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
       this.setState({listuser: nextProps.userlist});
      }
     }

    render() {
      return (
          <div>
            <table  className="table tableevents">
              {this.state.listuser.map ((resp) => (       
                    <tr>
                      <td>{resp.username}</td>
                      <td>{resp.email}</td>
                      <td>{resp.password}</td>
                      <td>{resp.phone}</td>
                      <td>{resp.gender}</td> 
                      <td>{resp.role}</td> 
                    </tr>
                  ))} 
            </table>      
          </div>
      );
    }
  }
  const mapStateToProps = (state) => {
    const { userlist} = state.userReducer;
    return { userlist};
  };


  const actions = {  
    successAlertHandler,
    failureAlertHandler
  }
  
  export default connect(mapStateToProps, actions)(Userlist)