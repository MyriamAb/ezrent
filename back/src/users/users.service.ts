import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async insertUser(
        name: string,
        email: string,
        password: string,
        phone: string
    ) {
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = password;
        newUser.phone = phone;
        const result = await this.usersRepository.save(newUser);
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
        profile_picture: BinaryType,
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
        const deletedUser = await this.usersRepository.findOne(id)
        const result = await this.usersRepository.remove(deletedUser);
        return result;
    }
}
