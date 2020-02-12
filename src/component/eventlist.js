import React, { Component } from 'react';
import '../css/Allcomponent.css';
import { connect } from 'react-redux';
import { successAlertHandler,failureAlertHandler } from '../action/alert.action';

class Eventlist extends Component {
    constructor(props) {
      super(props);
      this.state = {   
        listevents:props.eventslist
      }     
    } 
   
    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
       this.setState({listevents: nextProps.eventslist});
      }
     }

    render() {
      return (
          <div>
            <table  className="table tableevents">
              {this.state.listevents.map ((resp) => (       
                    <tr>
                      <td>{resp.name}</td>
                      <td>{resp.date}</td>
                      <td>{resp.time}</td>
                      <td>{resp.place}</td> 
                    </tr>
                  ))} 
            </table>      
          </div>
      );
    }
  }
  const mapStateToProps = (state) => {
    const { eventslist} = state.eventlistReducer;
    return { eventslist};
  };


  const actions = {  
    successAlertHandler,
    failureAlertHandler
  }
  
  export default connect(mapStateToProps, actions)(Eventlist)