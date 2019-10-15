import React, { Component } from 'react'
import '../CSS/signupComponent.css';
 
class homeComponent extends Component {
    render() {
        return (
            <div><h1 className="home">Home</h1>
                <img src={require('../images/website.jpg')} alt="image" className="homeimage" />
           </div>
        )
    }
}
export default homeComponent;