import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';

@Injectable()
export class ReservationService {
    constructor(@InjectRepository(Reservation) private reservationsRepository: Repository<Reservation>) { }

    async getReservations(reservation: Reservation): Promise<Reservation[]> {
        return await this.reservationsRepository.find();    
    }

    async getReservation(_id: number): Promise<Reservation[]> {
        return await this.reservationsRepository.find({
            select: [
                "start",
                "end",
                "owner_id",
                "owner_review",
                "client_id", 
                "client_review",
                "price",
                "status",
                "created_at",
                "end",
                "rental_id"
            ],
            where: [{ "id": _id}]
        });
    }

    async postReservation(reservation: Reservation) {
        this.reservationsRepository.save(reservation)
        return reservation
    }

    async updateRent(id, reservation: Reservation){
        const updatedUser = await this.findOne(id);
        if (reservation.start)
            updatedUser.start = reservation.start;
        if (reservation.end)
            updatedUser.end = reservation.end;
        if (reservation.owner_review)
            updatedUser.owner_review = reservation.owner_review;
        if (reservation.client_review)
            updatedUser.client_review = reservation.client_review;
        if (reservation.status)
            updatedUser.status = reservation.status;
        if (reservation.price)
            updatedUser.price = reservation.price;
        this.reservationsRepository.save(updatedUser);
        return updatedUser;
    }

    async deleteReservation(reservation: Reservation) {
        this.reservationsRepository.delete(reservation)
    }

    async findOne(id: number): Promise<Reservation | undefined> {
        const reservation = await this.reservationsRepository.find({ id: id });
        if (reservation.length>0)
          return reservation[0];
      }
}
