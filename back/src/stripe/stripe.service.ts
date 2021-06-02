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
     
  async create(stripe) {
    console.log('enter create back')
    const amount = stripe.items[0].nbDay * stripe.items[0].price * 100
    console.log(amount)
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: amount,
      currency: 'eur'
    });
    ({
      clientSecret: paymentIntent.client_secret
    })
    console.log (paymentIntent)
    return paymentIntent
  }

 
}