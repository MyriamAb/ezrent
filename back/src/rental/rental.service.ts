import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Repository } from 'typeorm';
import { Rental } from './rental.entity';

@Injectable()
export class RentalService {
    constructor(@InjectRepository(Rental) private rentalsRepository: Repository<Rental>) { }

    async getRentals(rental: Rental): Promise<Rental[]> {
        return await this.rentalsRepository.find();    
    }

    async getRental(_id: number): Promise<Rental[]> {
        return await this.rentalsRepository.find({
            select: [
                "title",
                "description",
                "address",
                "latitude",
                "longitude", 
                "capacity",
                "price",
                "start",
                "end",
                "created_at",
                "owner_id"
            ],
            where: [{ "id": _id}]
        });
    }
    @UseGuards(JwtAuthGuard)
    async postRental(rental: Rental) {
        const postRental= this.rentalsRepository.save(rental)
        return postRental
    }

    async updateRent(id, rental: Rental){
        const updatedUser = await this.findOne(id);
        if (rental.title)
            updatedUser.title = rental.title;
        if (rental.description)
            updatedUser.description = rental.description;
        if (rental.address)
            updatedUser.address = rental.address;
        if (rental.capacity)
            updatedUser.capacity = rental.capacity;
        if (rental.longitude)
            updatedUser.longitude = rental.longitude;
        if (rental.latitude)
            updatedUser.latitude = rental.latitude;
        if (rental.price)
            updatedUser.price = rental.price;
        if (rental.start)
            updatedUser.start = rental.start;
        if (rental.end)
            updatedUser.end = rental.end;
        this.rentalsRepository.save(updatedUser);
        return updatedUser;
    }

    async deleteRental(rental: Rental) {
        this.rentalsRepository.delete(rental)
    }

    async findOne(id: number): Promise<Rental | undefined> {
        const rental = await this.rentalsRepository.find({ id: id });
        if (rental.length>0)
          return rental[0];
      }
}
