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
        const user = await this.usersService.insertUser(
            userName,
            userEmail,
            await bcrypt.hash(userPassword, 10),
            userPhone
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'User added successfully',
            data: user,
        };
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
    update(
        @Param('id') userId: number,
        @Body('name') userName: string,
        @Body('email') userEmail: string,
        @Body('password') userPassword: string,
        @Body('phone') userPhone: string,
        @Body('profile_picture') userPicture: BinaryType,
    ) {
        const user = this.usersService.updateUser(
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

    @Delete(':id')
    deleteUser(@Param('id') userId: number) {
        const user = this.usersService.deleteUser(userId)
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
            data: user,
        };
    }
}
