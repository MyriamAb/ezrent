import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';



@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
    @InjectStripe() private readonly stripeClient: Stripe) { }

    async insertUser(
        name: string,
        email: string,
        password: string,
        phone: string,
        confirmationCode: string,
        stripeCustomerId : any
    ) {
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = password;
        newUser.phone = phone;
        newUser.verif_email = confirmationCode;
        newUser.stripeCustomerId = stripeCustomerId ;
        const result = await this.usersRepository.save(newUser);
        this.sendConfirmationEmail(name, email, confirmationCode);
        return result;
    }
    
    async insertUserGoogle(
        name: string,
        email: string,
    ) {
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.status = "Active";
        console.log("CP2");
        const result = await this.usersRepository.save(newUser);
        console.log("CP3");
        return result;
    }


    async getUsers(user: User): Promise<User[]> {
        return await this.usersRepository.find();    
    }
    
    async getUser(_id: number): Promise<User[]> {
        return await this.usersRepository.find({
            select: [
                "name",
                "email",
                "phone",
                "profile_picture"
            ],
            where: [{ "id": _id}]
        });
    }

    async updateUser(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        profile_picture: string,
    ) {
        const updatedUser = await this.usersRepository.findOne(id)
        if (name)
            updatedUser.name = name;
        if (email)
            updatedUser.email = email;
        if (password)
            updatedUser.password = await bcrypt.hash(password, 10);
        if (phone)
            updatedUser.phone = phone;
        if (profile_picture)
            updatedUser.profile_picture = profile_picture;
        
        const result = await this.usersRepository.save(updatedUser);
        return result;
    }

    async deleteUser(id: number) {
        const deletedUser = await this.usersRepository.findOne(id);
        const result = await this.usersRepository.remove(deletedUser);
        return result;
    }

    async findLogin(email: string) {
        const user = await this.usersRepository.findOne({ where: [{ "email": email }] });
        console.log(user);
        return user;
    }

    async findOneByToken(confirmationCode: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ verif_email: confirmationCode });
    return user;
    /* return this.usersModel.find(user => user.username === username); */
    }

    createEmailToken(): string {
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length )];
        }
        return token;
    }

    async verifyUser(confirmationCode: string): Promise<User | undefined> {
        const user = await this.findOneByToken(confirmationCode);
        if (user) {
        user.status = "Active";
        this.usersRepository.save(user)
        return user;
        }
    }

    sendConfirmationEmail(name, email, confirmationCode) {

        const Nodemailer = require("nodemailer");
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const transport = Nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "a4d15c48ccd1ba",
                pass: "fe7ca2d17c37c4"
            }
        });
        console.log("Check");
        transport.sendMail({
            from: "GIRLPOWER",
            to: email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:5000/users/confirm/${confirmationCode}> Click here</a>
            </div>`,
        }).catch(err => console.log(err));
    }
    
    /* async updateStripe(
        userId: string,
        stripeCustomerId
    ) {
        const userEntity = new User();

        userEntity.stripeCustomerId = stripeCustomerId;

        return await this.userRepository.update(userId, userEntity);
    }

    async updateRole(
        userId: string,
        role
    ) {
        const userEntity = new User();
        userEntity.role = role;
        return await this.userRepository.update(userId, userEntity);
    }
    
    async getStripeId(userId): Promise {
        return await this.userRepository
            .createQueryBuilder("user")
            .select(["user.stripeCustomerId"])
            .where("user.id = :userId", { userId: userId })
            .getOne();
    }
         */
}
