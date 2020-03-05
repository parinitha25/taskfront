import React, { Component } from 'react';
import { connect } from 'react-redux';
import { geteventlist } from '../action/events.action';
import { invitatinguser } from '../action/signup.action';
import { failureAlertHandler } from '../action/alert.action';
import Eventlist from '../component/eventlist';
import Userlist from './userlist';
import Invite from './invitetab';
import Navbar from './Navbar';


class Admin extends Component {
  constructor(props) {
    super(props);
      this.state = {
      activeTab: ''
    } 
  }   

  eventlist(){
    return <Eventlist  onsubmit={this.eventstabClicked}/>
  }

  userlist(){
    return <Userlist   onsubmit={this.usertabClicked}/>
  }

  invite(){
    return <Invite   onsubmit={this.invitationtabClicked}/>
  }
  eventstabClicked=()=>{
    const {geteventlist ,failureAlertHandler } = this.props
    geteventlist()
      .then(resp => {
        this.setState({ activeTab:1 })     
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  } 

  usertabClicked=()=>{    
    const {geteventlist,failureAlertHandler } = this.props
    geteventlist()
      .then(resp => {
        this.setState({ activeTab:2 })
      })
      .catch(error => {
        failureAlertHandler(error);
      })
  }

  invitationtabClicked=()=>{    
    const {invitatinguser,failureAlertHandler } = this.props
    invitatinguser()
      .then(resp => {
        this.setState({ activeTab:3 })
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
                  <div className={"nav-item nav-link" 
                      + (this.state.activeTab === 3 ? ' active' : '')} 
                      onClick={() => this.invitationtabClicked()}>
                     invitation tab
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
                <div className={"tab-pane fade" 
                    + (this.state.activeTab === 3 ? ' show active' : '')} > 
                    {this.invite()}  
                </div>
              </div>
            </div>
      );
  }
}
 
function mapStateToProps(state) { 
    const {userlist} = state.userReducer;
    return { userlist};
}

const actions = {
    geteventlist,
    invitatinguser,
    failureAlertHandler 
  }
  
export default connect(mapStateToProps, actions)(Admin)
