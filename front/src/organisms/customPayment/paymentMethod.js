import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function PaymentMethed() {
  const stripe = require("stripe")("pk_test_51IsNySAQArDV5cBDQy5GSkkhHV2FX283JHxwG4L2XiUmWfnF4og6GSznds1vfnuho1svtriLC0uZMi93WnVL9sUq00vQPVDzMJ");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);


  async function paymentInfo() {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 5,
        exp_year: 2022,
        cvc: '314',
      },
    })
  }
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

  return (
    <CardElement id="card-element" options={cardStyle} onChange={handleChange}>
      
    </CardElement>
  )
}
