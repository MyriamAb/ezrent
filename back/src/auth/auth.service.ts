import { Injectable, Request, Response, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PaymentService } from 'src/stripe/stripe.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService,
     private paymentService: PaymentService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findLogin(email);
    if (user &&  await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(user: any) {
    const payload = { username: user.name, id: user.id, email: user.email };
    
     if (user.status != "Active") {
      return {
          status: 401,
          message: "Pending Account. Please Verify Your Email!",
        };
      }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login_google(user: any) {
    const res = await this.usersService.findOrCreate(user.name, user.email);
    const payload = { username: res.name, id: res.id, email: res.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login_facebook(user: any) {
    console.log(user)
    const res = await this.usersService.findOrCreate(user.name, user.email);
    const payload = { username: res.name, id: res.id, email: res.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

