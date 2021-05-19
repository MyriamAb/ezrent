import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './organisms/header'
import Profile from "./organisms/profile"
import Home from "./organisms/home";

function App() {
  return (
    
      <Router>
        <Header />
        
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/profile' component={Profile}/>
        </Switch>
      </Router>
    
  );
}

export default App;
