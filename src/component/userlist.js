import React, { Component } from 'react';
import '../css/Allcomponent.css';
import { connect } from 'react-redux';
import { successAlertHandler,failureAlertHandler } from '../action/alert.action';
import {Accordion,AccordionItem,AccordionItemHeading, AccordionItemButton,AccordionItemPanel} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import moment from 'moment';

class Userlist extends Component {
    constructor(props) {
      super(props);
      this.state = {   
        listuser:props.userlist,
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
              {this.state.listuser.map ((resp) => (  
                <Accordion>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        { resp.username}                               
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <table className="table tableevents">
                        { resp.events.map ((resp) => ( 
                          <AccordionItemPanel>                         
                            <tr>                   
                              <td>{resp.name}</td>                                        
                              <td>{resp.place}</td> 
                              <td>{moment(resp.date).format('YYYY-MM-DD')}</td> 
                              <td>{moment(resp.time).format( 'h:mm a')}</td>                         
                            </tr>
                          </AccordionItemPanel>
                        ))}
                    </table>
                  </AccordionItem>
                </Accordion>                       
              ))} 
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
    failureAlertHandler,
  }
  
  export default connect(mapStateToProps, actions)(Userlist)