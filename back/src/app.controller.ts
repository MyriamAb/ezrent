import { Controller, Get, Request, Post, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard }                                         from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/login/google')
  async login_google(@Request() req) {
    console.log(req.body)
    return this.authService.login_google(req.body);
  }
  
  @Post('auth/login/facebook')
  async login_facebook(@Request() req) {
    return this.authService.login_google(req.body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  
  @Get("/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      access_token: req.user,
    };
  }

}