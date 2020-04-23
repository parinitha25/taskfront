import React, { Component } from 'react';
import { connect } from 'react-redux';
import { successAlertHandler,failureAlertHandler } from '../action/alert.action';
import {Accordion,AccordionItem,AccordionItemHeading, AccordionItemButton,AccordionItemPanel} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { geteventlist} from '../action/events.action';
import moment from 'moment';
import '../css/Allcomponent.css';

class Userlist extends Component {
    constructor(props) {
      super(props);
      this.state = {   
        list: [],
        pageNo: 2,
        userlisttotal:[]
      }     
    } 
 
    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
       this.setState({list: nextProps.user,userlisttotal:nextProps.usercount});
      }
     }

     geteventlist = () => {
      let { pageNo } = this.state
      const { geteventlist, failureAlertHandler } = this.props
      geteventlist(pageNo)
        .then(resp => {
          this.setState({pageNo :pageNo +1 })
        })
        .catch(error => {
          failureAlertHandler(error);
        })
    }
  
    render() {
      return (
          <div>          
              {this.state.list.map ((resp) => (  
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
                {this.state.userlisttotal.map((resp) => (
                  <tr> 
                    <td> 
                      <button style={{ display: resp.total-1 <= resp.pageNo ? 'none' : 'block' }} onClick={this.geteventlist}>Show more</button>
                    </td>
                  </tr>
                ))}     
          </div>
      );
    }
  }
  const mapStateToProps = (state) => {
    const { user,usercount} = state.userReducer;
    return { user,usercount};
  };

  const actions = {  
    successAlertHandler,
    failureAlertHandler,
    geteventlist
  }
  
  export default connect(mapStateToProps, actions)(Userlist)