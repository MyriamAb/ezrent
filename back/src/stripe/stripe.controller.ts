import { Controller, Body, Post, ValidationPipe, UsePipes, Req,  } from '@nestjs/common';
import { PaymentService } from './stripe.service';
import {PaymentCreateDto} from './payment.DTO'

@Controller('/')
export class PaymentController {
  constructor(private paymentService: PaymentService) { }
  
/*   @UsePipes(new ValidationPipe({ whitelist: true }))
 */
  @Post('/create-payment-intent')
  create(
    @Body() paymentCreateDto: PaymentCreateDto)
  {
    console.log ('post controller')
    return this.paymentService.create(paymentCreateDto);
  }

 /*  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post('/validate-payment')
  async creditValidation(
  @Req() {rawBody}, 
  @Body () body,
  @Headers('stripe-signature') signature: string) {
  return this.paymentService.validation(
  {
    stripeSignature
    stripeResponse: rawBody,
    type: body.type,  
    stripeId: body.data.object.id,
  });
} */
}