import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './organisms/header'
import Footer from './organisms/footer'
import Profile from "./organisms/profile"
import Home from "./organisms/home"
import Login from './organisms/login'
import Register from './organisms/register'

function App() {
  return (
    <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/profile' component={Profile}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
      </Switch>
      <Footer/>
      </Router>
  )
}

export default App;
