import { Controller, Body, Post, ValidationPipe, UsePipes, Req, UseGuards  } from '@nestjs/common';
import { PaymentService } from './stripe.service';
import { PaymentCreateDto } from './payment.DTO'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'



@Controller('/')
export class PaymentController {
  constructor(private paymentService: PaymentService) { }
  
/*   @UsePipes(new ValidationPipe({ whitelist: true }))
 */
  @Post('/create-payment-intent')
  @UseGuards(JwtAuthGuard)
  create(
    @Body() paymentCreateDto: PaymentCreateDto)
  {
    console.log ('post controller')
    return this.paymentService.create(paymentCreateDto);
  }

 /*  @Post('/payment-method')
  post(
    @Body() paymentCreateDto: PaymentCreateDto)
    {
       return this.paymentService.paymentInfo(paymentCreateDto)
     } */
   

}