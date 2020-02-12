import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  geteventlist ,getalluser} from '../action/events.action';
import { failureAlertHandler } from '../action/alert.action';
import Eventlist from '../component/eventlist';
import Userlist from '../component/user';
import Navbar from './Navbar';


class Admin extends Component {
  constructor(props) {
    super(props);
      this.state = {
      activeTab: ''
    } 
  }   

  eventlist(){
    return <Eventlist  onsubmit={this.tabClicked}/>
  }

  userlist(){
    return <Userlist   onsubmit={this.tabClickedd}/>
  }

  eventstabClicked=()=>{
    const {geteventlist,failureAlertHandler } = this.props
    geteventlist()
      .then(resp => {
        this.setState({ activeTab:1 })
      
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  } 

  usertabClicked=()=>{    
    const {getalluser,failureAlertHandler } = this.props
    getalluser()
      .then(resp => {
        this.setState({ activeTab:2 })
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  }

  render() {
        return (
            <div>
              <Navbar/>
              <div className="nav nav-tabs eventstab">
                  <div className={"nav-item nav-link" 
                      + (this.state.activeTab === 1 ? ' active' : '')}                       
                      onClick={() => this.eventstabClicked()}>
                      Events                        
                  </div>
                  <div className={"nav-item nav-link" 
                      + (this.state.activeTab === 2 ? ' active' : '')} 
                      onClick={() => this.usertabClicked()}>
                      Users
                  </div>                     
              </div>
              <div className="tab-content col-md-12" >
                <div className={"tab-pane fade" 
                    + (this.state.activeTab === 1 ? ' show active' : '')} >     
                    {this.eventlist()}
                </div>
                <div className={"tab-pane fade" 
                    + (this.state.activeTab === 2 ? ' show active' : '')} > 
                    {this.userlist()}  
                </div>
              </div>
            </div>
      );
  }
}
 
function mapStateToProps(state) {
    const {evenstlist} = state.eventlistReducer;
    const {userlist} = state.userReducer;
    return { evenstlist,userlist};
}

const actions = {
    geteventlist,
    getalluser,
    failureAlertHandler
  }
  
export default connect(mapStateToProps, actions)(Admin)
