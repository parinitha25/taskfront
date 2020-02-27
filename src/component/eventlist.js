import React, { Component } from 'react';
import '../css/Allcomponent.css';
import { connect } from 'react-redux';
import { successAlertHandler,failureAlertHandler } from '../action/alert.action';
import moment from 'moment';

class Eventlist extends Component {
    constructor(props) {
      super(props);
      this.state = {   
        listevents:props.userlist
      }     
    } 
       
    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
       this.setState({listevents: nextProps.userlist});
      }
     }

    render() {
      return (
          <div>
            <table className="table tableevents">
              {this.state.listevents.map ((resp) => (       
                    <tr>                     
                        {resp.events.map ((resp) => ( 
                          <tr>                   
                            <td>{resp.name}</td>                                        
                            <td>{resp.place}</td> 
                            <td>{moment(resp.date).format('YYYY-MM-DD')}</td> 
                            <td>{moment(resp.time).format( 'h:mm a')}</td>                         
                          </tr>                                       
                        ))}                     
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
  
  export default connect(mapStateToProps, actions)(Eventlist)