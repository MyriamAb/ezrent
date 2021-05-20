import { Injectable, Request, Response, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
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
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }
    return {
      message: 'User information from google',
      user: req.user
    }
  }
}

