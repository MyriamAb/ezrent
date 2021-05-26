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