import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import userComponents from './Components/userComponents';
function App() {
  return (
    <div className="App">
      <Router>
      <Switch>     
      <Route exact path='/' component={userComponents}></Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
