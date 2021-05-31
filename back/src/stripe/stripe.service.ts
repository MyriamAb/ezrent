import { Injectable, Inject } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { config } from 'dotenv';

config();

@Injectable()
export class PaymentService {
  public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async createStripeCustomer()
  {
    console.log('created customer')
    const customer = await this.stripeClient.customers.create({
      description: 'My First Test Customer (created for API docs)',
    });
    ({stripeCustomerId: customer.id})
    console.log(customer)
    return customer.id;
  }

   /* async paymentInfo({}) {
    const paymentMethod = await this.stripeClient.confimCardPayment(clientSecret,{
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 5,
        exp_year: 2022,
        cvc: '314',
      }
    })
     return paymentMethod
  } */
     
  async create(stripe) {
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: 10000,
      currency: "usd",
/*       payment_method_types: ["card"]
 */    
    });
    ({
      clientSecret: paymentIntent.client_secret
    })
    console.log (paymentIntent)
    return paymentIntent
  }

 
}