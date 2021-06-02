import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class PaymentCreateDto {
  // ... Other parameters

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;
  
  @IsNotEmpty()
  @IsString()
  type: '';

  @IsNotEmpty()
  @IsString()
  description: '';

}

// ... other DTOs