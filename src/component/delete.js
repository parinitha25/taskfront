import React, { Component } from 'react';
import '../css/Allcomponent.css';

class Delete extends Component {
    constructor(props) {
      super(props);
      this.state = {
        deleteobject:props.deletelist,
        messagedisplay:props.sucessmessage, 
      }     
    } 
    
    componentWillReceiveProps(nextProps) {
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

    render() {
      return (
          <div>
            <h4>Do you want to delete this <b>Event</b> list?{this.state.deleteobject.name}</h4>
            <span className="textmessage">{this.state.messagedisplay}</span>
            <table  className="table">
              <button onClick={() => this.handleSubmitdelete()} className="btn btn-primary yesbuton">yes</button>
              <button onClick={()=>this.handleSubmitdeleteclose()} className="btn btn-primary nobutton">No</button>
            </table>   
          </div>
      );
    }
  }
  
  export default Delete;