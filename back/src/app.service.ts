import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  googleLogin(req) {
    if (!req.user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No user from google'
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'User information from google',
      data: req.user
    }
  }

}
