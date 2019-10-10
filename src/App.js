import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import userComponents from './Components/userComponents';
import loginComponent from './Components/loginComponent';
import homeComponent from './Components/homeComponent';


function App() {
  return (
    <div className="App">
      <Router>
      <Switch>     
      <Route exact path='/' component={userComponents}></Route>
      <Route exact path='/login' component={loginComponent}></Route>
      <Route exact path='/home' component={homeComponent}></Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
