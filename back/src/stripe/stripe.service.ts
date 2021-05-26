import { Injectable, Inject } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { config } from 'dotenv';

config();

@Injectable()
export class PaymentService {
  public constructor(@InjectStripe() private readonly stripeClient: Stripe) { }


  async create(stripe) {
    console.log('create in service')
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
  /* validation(
    paymentValidation: PaymentValidation,
  ): void {
    const {stripeId, type} = creditPaymentValidation;

    const {_id: userId} = user;

    try {
      if (
        type === "charge_succeeded" ||
        type === "payment_failed"
      ) {
        this.paymentDal.creditValidation({
          status:
            type === "charge_succeeded"
              ? "success"
              : "error",
          stripeId,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }  */
}