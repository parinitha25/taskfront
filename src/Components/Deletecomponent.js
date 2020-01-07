import React, { Component } from 'react';
import '../CSS/Allcomponent.css';

class Deletecomponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        deleteobject:props.deletelist,
        messagedisplay:props.sucessmessage,
      
      }     
    } 
    
    componentWillReceiveProps(nextProps) {
      debugger
      if (this.props !== nextProps) {
       this.setState({messagedisplay: nextProps.sucessmessage});
      }
     }

    handleSubmitdelete=()=>{
      this.props.onsubmit(this.state.deleteobject)
    }
    handleSubmitdeleteclose= () => {
        this.props.onsubmitclose();
      }
    handleDate = (date) => {
      this.setState({
        date: date,
        time: date
      });
    }
  
    render() {
      return (
          <div>
            <h4>Do you want to delete this <b>Event</b> list?{this.state.deleteobject.name}</h4>
            {/* <div className="displayid">{this.state.deleteobject.name}</div> */}
            <span style={{color:'red' ,fontsize:"30px"}}>{this.state.messagedisplay}</span>
            <table  className="table">
              <button onClick={() => this.handleSubmitdelete()} className="yesbuton">yes</button>
              <button onClick={()=>this.handleSubmitdeleteclose()}>No</button>
           
            </table>
           
          </div>
      );
    }
  }
  
  export default Deletecomponent;