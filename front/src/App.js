import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './organisms/header'
import Footer from './organisms/footer'
import Profile from "./organisms/profile/profile"
import User from './organisms/profile/public/user'
import Home from "./organisms/home"
import Login from './organisms/login'
import Register from './organisms/register'
import Password from './organisms/password/password'
import PasswordEmail from './organisms/password/password_email'
import AdDetails from './organisms/adDetails'
import EditMyAd from './organisms/profile/myAds/editMyAd'
import { RentalsProvider } from './context/rentals';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./organisms/customPayment/checkoutForm";
import { GoogleApiProvider } from 'react-gapi';
import { UserProvider } from './context/user'
import { ReservationsProvider } from './context/reservation'


const promise = loadStripe("pk_test_51IsNySAQArDV5cBDQy5GSkkhHV2FX283JHxwG4L2XiUmWfnF4og6GSznds1vfnuho1svtriLC0uZMi93WnVL9sUq00vQPVDzMJ ");

   
function App() {
  return (
    <Router>
      <GoogleApiProvider clientId={'814535166282-uj0rs7jnubeqglcaie0lm4j0gg8625pi.apps.googleusercontent.com'}>
      <Elements stripe={promise}>    
        <UserProvider>
          <RentalsProvider>
              <ReservationsProvider>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/user/:id' component={User} />      
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/addetails/:id' component={AdDetails}/>
            <Route path='/myads/:id' component={EditMyAd}/>
            <Route path='/checkoutform/:id' component={CheckoutForm} />
            <Route path='/password/:id' component={Password} />
            <Route path='/password' component={PasswordEmail} />
          </Switch>
          <Footer/>
              </ReservationsProvider>
          </RentalsProvider>
        </UserProvider>
       </Elements>
      </GoogleApiProvider>
    </Router>
  )
}

export default App;
