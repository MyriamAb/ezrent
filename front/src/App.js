import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import Header from './organisms/header'
import Footer from './organisms/footer'
import Profile from "./organisms/profile"
import Home from "./organisms/home"
import Login from './organisms/login'
import Register from './organisms/register'
import AdDetails from './organisms/adDetails'
import { UserProvider } from './context/user'
import { RentalsProvider } from './context/rentals';

   
function App() {
  return (
  <Router>
        <UserProvider>
          <RentalsProvider>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/addetails/:id' component={AdDetails}/>
        </Switch>
        <Footer/>
          </RentalsProvider>
      </UserProvider>
    </Router>
  )
}

export default App;
