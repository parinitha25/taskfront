import React, { Component } from 'react';
import '../CSS/Allcomponent.css';

class Deletecomponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        deleteobject:props.deletelist
      }     
  }
  
    handleSubmitdelete=()=>{
      this.props.onsubmit(this.state.deleteobject);
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
            <h4>Do you want to delete this list?</h4>
            <div className="displayid">{this.state.deleteobject._id}</div>
            <table  className="table">
              <button onClick={() => this.handleSubmitdelete()} className="yesbuton">yes</button>
              <button onClick={()=>this.handleSubmitdeleteclose()}>No</button>
            </table>
          </div>
      );
    }
  }
  
  export default Deletecomponent;