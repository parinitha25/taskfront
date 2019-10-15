import React, { Component } from 'react'
import '../CSS/signupComponent.css';
 
class homeComponent extends Component {
    render() {
        return (
            <div><h1 className="home">Home</h1>
                <img src="/website.jpg" alt="image111" className="homeimage" />
           </div>
        )
    }
}
export default homeComponent;