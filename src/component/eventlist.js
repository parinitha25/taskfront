import React, { Component } from 'react';
import '../css/Allcomponent.css';
import { connect } from 'react-redux';
import { successAlertHandler, failureAlertHandler } from '../action/alert.action';
import { geteventlist} from '../action/events.action';
import moment from 'moment';

class Eventlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNo: 2,
      userlisttotal:[]
    }
  }

  componentWillMount = () => {
    const {geteventlist,failureAlertHandler } = this.props
    geteventlist()
      .then(resp => {
        this.setState({ list: this.props.user})
      })
      .catch(error => {
        failureAlertHandler(error);
      })
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
        <table className="table tableevents">
          {this.state.list.map((resp) => (
            resp.events.map((resp) => (
              <tr>
                <td>{resp.name}</td>
                <td>{resp.place}</td>
                <td>{moment(resp.date).format('YYYY-MM-DD')}</td>
                <td>{moment(resp.time).format('h:mm a')}</td>
              </tr>
            ))
          ))}
        </table>
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
  debugger
  const { user ,usercount} = state.userReducer;
  return { user ,usercount};
};

const actions = {
  successAlertHandler,
  failureAlertHandler,
  geteventlist
}

export default connect(mapStateToProps, actions)(Eventlist)