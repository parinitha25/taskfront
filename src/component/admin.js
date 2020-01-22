import React, { Component } from 'react';
import {  geteventlist } from '../action/home.action';
import { failureAlertHandler } from '../action/alert.action';
import { connect } from 'react-redux';
import moment from 'moment';

class Admin extends Component {
    constructor(props) {
      super(props);
      this.state = {
        events: []
      }     
    } 

    eventlist = () => {
        debugger
        const {geteventlist, failureAlertHandler } = this.props
        geteventlist()
          .then(resp => {
            this.setState({ events: resp })
          })
          .catch(error => {
            failureAlertHandler(error);
          })
        } 

    render() {
      return (
          <div>
            <h4>hiiii</h4>   
            <button onClick={this.eventlist()}>Events</button>
        
            <table border="1" className="table">
            <thead>
              <tr className="tableheading">
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Place</th>
              </tr>
              </thead>
              {/* <tbody>
                {this.state.events.map((resp, index) => (
                  <tr>
                    <td>{resp.name}</td>
                    <td>{moment(resp.date).format('YYYY-MM-DD')}</td>
                    <td>{moment(resp.time).format( 'h:mm a')}</td>
                    <td>{resp.place}</td> 
                  </tr>
                ))}
              </tbody> */}
            </table>
            <button>Users</button>
          </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    const {name, date, time, place} = state.eventsReducer;
    return { name, date, time, place };
  };

  const actions = {
    geteventlist,
    failureAlertHandler
  }
  
  export default connect(mapStateToProps, actions)(Admin)