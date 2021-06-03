import { Controller, Post, Body, Get, Patch, Delete, Param, HttpStatus, Redirect, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { PaymentService } from '../stripe/stripe.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService,
        private paymentService: PaymentService) {}

    @Post()
    async post(
        @Body('name') userName: string,
        @Body('email') userEmail: string,
        @Body('password') userPassword: string,
        @Body('phone') userPhone: string,
    
        ) {
        try {
            
            const stripeCustomerId = await this.paymentService.createStripeCustomer();
            const confirmationCode = this.usersService.createEmailToken();
            const user = await this.usersService.insertUser(
                userName,
                userEmail,
                await bcrypt.hash(userPassword, 10),
                userPhone,
                confirmationCode,
                stripeCustomerId
            );
            return {
                statusCode: HttpStatus.OK,
                message: 'User added successfully',
                data: user,
            };
        }
        catch (err) {
            if (err.sqlState == 23000)
            return {
                statusCode: HttpStatus.CONFLICT,
                message: 'Email already taken',
                data: err,
            }
        }
    }

    @Get()
    getAll(user: User) {
        return this.usersService.getUsers(user)
    }

    @Get(':id')
    get(@Param() params) {
        return this.usersService.getUser(params.id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id') userId: number,
        @Body('name') userName: string,
        @Body('email') userEmail: string,
        @Body('password') userPassword: string,
        @Body('phone') userPhone: string,
        @Body('profile_picture') userPicture: string,
    ) {
        try {
            const user = await this.usersService.updateUser(
                userId,
                userName,
                userEmail,
                userPassword,
                userPhone,
                userPicture
            );
            return {
                statusCode: HttpStatus.OK,
                message: 'User updated successfully',
                data: user,
            };
        }
        catch (err) {
            if (err.sqlState == 23000)
            return {
                statusCode: HttpStatus.CONFLICT,
                message: 'Email already taken',
                data: err,
            }
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteUser(@Param('id') userId: number) {
        const user = this.usersService.deleteUser(userId);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
            data: user,
        };
    }

    @Get('confirm/:confirmationCode')
    @Redirect('http://localhost:3000/login')
    changeStatus(@Param('confirmationCode') confirmationCode: string) {
        const user = this.usersService.verifyUser(confirmationCode);
        return {
            statusCode: HttpStatus.OK,
            message: 'Email verified successfully',
            data: user,
        };
    }

    @Post('forgotpassword/')
    async sendForgotPw(@Body('email') userEmail: string) {
        const user = await this.usersService.findLogin(userEmail);
        this.usersService.sendForgotPw(user.email, user.name, user.id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Reset password email send successfully',
        }
    }

    @Post('resetpassword/')
    async resetPassword(
        @Body('password') newPassword: string,
        @Body('reset_token') resetToken: string
    ) {
        const user = await this.usersService.resetPassword(
            await bcrypt.hash(newPassword, 10),
            resetToken
        );
        if (user) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Password updated successfully',
                data: user
            }
        }
        return {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'User not found'
        }
    }

    @Post('paymentmail/')
    async sendPaymentMail(
        @Body('name') userName: string,
        @Body('email') userEmail: string,
        @Body('amount') amount: number,
        @Body('nbDay') nbDay: number
    ) {
       
        
        const user = await this.usersService.sendPaymentMail(
            userName,
            userEmail,
            amount,
            nbDay
        )
        
    }

}
