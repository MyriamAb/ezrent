import { Injectable, Request, Response, Res, HttpStatus } from '@nestjs/common';
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
  
  async googleLogin(req) {
    if (!req.user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No user from google'
      };
    }
    
    if (await this.usersService.findLogin(req.user.email) == undefined) {
      console.log("CP1")
      await this.usersService.insertUserGoogle(
        `${req.user.firstName} ${req.user.lastName}`,
        req.user.email
      ) 
    }
    const user = await this.usersService.findLogin(req.user.email)
    console.log(user)
    return {
      access_token: this.jwtService.sign({ username: user.name, email: user.email, id: user.id })
    };
/*     return {
      statusCode: HttpStatus.OK,
      message: 'User information from google',
      data: req.user
    } */
  }

}

