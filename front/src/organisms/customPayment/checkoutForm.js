import React, { useState, useEffect, useCallback } from "react";
import {useParams} from 'react-router'
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import '../../styles/stylesPayment.css';
import { Header } from 'semantic-ui-react'
import useReservations from '../../context/reservation'



export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const reservationsContext = useReservations()
  const reservation = reservationsContext?.reservation ?? null
  
  useEffect(() => {
    reservationsContext?.getReservation(id)
    dayNumber()
  }, [id])
  console.log(reservation[0]?.price)

  const dayNumber = useCallback(() => {
    function datediff(start, end) {
        return Math.round((end-start)/(1000 * 60 * 60 * 24));
    }
    function parseDate(str) {
    
      var mdy = str.split('-');
      return new Date(mdy[0], mdy[1]-1, mdy[2]); 
    }
    if (datediff === null || datediff === undefined || parseDate === null || parseDate === undefined)
        return

      const nbDay= datediff(parseDate(reservation[0]?.start.slice(0,10)), parseDate(reservation[0]?.end.slice(0,10)))
  
      console.log(nbDay)
      return nbDay
    
    
  },[reservation])
  
  useEffect(() => {
    if (reservation[0]) {
      window
        .fetch("http://localhost:5000/create-payment-intent", {
          method: "POST",
          headers: {
  
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            items: [{
              id: reservation[0]?.id,
              price: parseFloat(reservation[0]?.price),
              nbDay: dayNumber()
            }]
          })
        })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setClientSecret(data.client_secret);
        });
    }
    // Create PaymentIntent as soon as the page loads
  }, [reservation, dayNumber]);
  
  
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    console.log(payload);
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <div>
    <Header>         
      Payment Checkout
    </Header>
   
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <button
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded
        </p>
        </form>
    </div>
  );
}
