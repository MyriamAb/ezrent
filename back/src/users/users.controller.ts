import { Controller, Post, Body, Get, Patch, Delete, Param, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    async post(
        @Body('name') userName: string,
        @Body('email') userEmail: string,
        @Body('password') userPassword: string,
        @Body('phone') userPhone: string,
    ) {
        try {
            const confirmationCode = this.usersService.createEmailToken();
            const user = await this.usersService.insertUser(
                userName,
                userEmail,
                await bcrypt.hash(userPassword, 10),
                userPhone,
                confirmationCode
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
    async update(
        @Param('id') userId: number,
        @Body('name') userName: string,
        @Body('email') userEmail: string,
        @Body('password') userPassword: string,
        @Body('phone') userPhone: string,
        @Body('profile_picture') userPicture: BinaryType,
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
    deleteUser(@Param('id') userId: number) {
        const user = this.usersService.deleteUser(userId);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
            data: user,
        };
    }

    @Get('confirm/:confirmationCode')
    changeStatus(@Param('confirmationCode') confirmationCode: string) {
        const user = this.usersService.verifyUser(confirmationCode);
        return {
            statusCode: HttpStatus.OK,
            message: 'Email verified successfully',
            data: user,
        };
    }
}
