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
    const customer = await this.stripeClient.customers.create({
      description: 'My First Test Customer (created for API docs)',
    });
    ({stripeCustomerId: customer.id})
    
    return customer.id;
  }
     
  async create(stripe) {
    const amount = stripe.items[0].nbDay * stripe.items[0].price * 100
    const stripeCustomerId = await stripe.items[0].customer
    const receipt_email = await stripe.items[0].receipt_email
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: amount,
      currency: 'eur',
      customer: stripeCustomerId,
      receipt_email: receipt_email
    });
    ({
      clientSecret: paymentIntent.client_secret
    })
    return paymentIntent
  }

  async createInvoice(stripe) {
     const invoice = await this.stripeClient.invoices.create({
       customer: stripe,
     });
  }
 
}