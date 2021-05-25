import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { UsersService } from '../users/users.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor(private usersService: UsersService, private jwtService: JwtService) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "http://localhost:5000/facebook/redirect",
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    if (await this.usersService.findLogin(user.email) == undefined) {
        await this.usersService.insertUserGoogle(
            `${user.firstName} ${user.lastName}`,
            user.email,
        ) 
    }
      const userDB = await this.usersService.findLogin(user.email)
      const access_token = this.jwtService.sign({ username: userDB.name, email: userDB.email, id: userDB.id })
/*     const payload = {
      user,
      accessToken,
    }; */

    done(null, access_token);
  }
}
