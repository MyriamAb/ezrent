import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import Header from './organisms/header'
import Footer from './organisms/footer'
import Profile from "./organisms/profile/profile"
import Home from "./organisms/home"
import Login from './organisms/login'
import Register from './organisms/register'
import { UserProvider } from './context/user'
import AdDetails from './organisms/adDetails'

function IdParam () {
    let { id } = useParams()
    console.log(id)
}
   
function App() {
  return (
    <Router>
        <UserProvider>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/addetails/:id' component={AdDetails}/>
        </Switch>
        <Footer/>
      </UserProvider>
    </Router>
  )
}

export default App;
