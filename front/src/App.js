import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './organisms/header'
import Footer from './organisms/footer'
import Profile from "./organisms/profile/profile"
import Home from "./organisms/home"
import Login from './organisms/login'
import Register from './organisms/register'
import { UserProvider } from './context/user'
import AdDetails from './organisms/adDetails'
import { RentalsProvider } from './context/rentals';
import { loadStripe } from "@stripe/stripe-js";
import { Elements,} from "@stripe/react-stripe-js";
import PaymentMethod from "./organisms/customPayment/paymentMethod";

const promise = loadStripe("pk_test_51IsNySAQArDV5cBDQy5GSkkhHV2FX283JHxwG4L2XiUmWfnF4og6GSznds1vfnuho1svtriLC0uZMi93WnVL9sUq00vQPVDzMJ ");

   
function App() {
  return (
    <Router>
      <Elements stripe={promise}>    
        <UserProvider>
          <RentalsProvider>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/addetails/:id' component={AdDetails} />
            <Route path='/paymentMethod' component={PaymentMethod} />
          </Switch>
          <Footer/>
          </RentalsProvider>
        </UserProvider>
       </Elements>
    </Router>
  )
}

export default App;
