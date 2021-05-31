import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { User } from '../users/user.entity';


@Injectable()
export class ReservationService {
    constructor(@InjectRepository(Reservation) private reservationsRepository: Repository<Reservation>,
                @InjectRepository(User) private usersRepository: Repository<User>) { }

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
        this.reservationsRepository.save(reservation);
        this.sendBookedEmail(reservation.owner_id);
        return reservation
    }

    async updateReservation(id, reservation: Reservation){
        const updatedRes = await this.findOne(id);
        if (reservation.start)
            updatedRes.start = reservation.start;
        if (reservation.end)
            updatedRes.end = reservation.end;
        if (reservation.owner_review)
            updatedRes.owner_review = reservation.owner_review;
        if (reservation.client_review)
            updatedRes.client_review = reservation.client_review;
        if (reservation.status) {
            updatedRes.status = reservation.status;
            if (reservation.status == "WAITING FOR CLIENT'S PAIEMENT" || reservation.status == "REFUSED")
            this.sendAcceptedoRefusedEmail(updatedRes.client_id, reservation.status)
        }
        if (reservation.price)
            updatedRes.price = reservation.price;
        this.reservationsRepository.save(updatedRes);
        return updatedRes;
    }

    async deleteReservation(reservation: Reservation) {
        this.reservationsRepository.delete(reservation)
    }

    async findOne(id: number): Promise<Reservation | undefined> {
        const reservation = await this.reservationsRepository.find({ id: id });
        if (reservation.length>0)
          return reservation[0];
      }

    
    async sendBookedEmail(owner_id) {
        
        const user = await this.usersRepository.findOne(owner_id)
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
            to: user.email,
            subject: "You have a pending reservation",
            html: `<h1>Pending Reservation</h1>
            <h2>Hello ${user.name}</h2>
            <p>You have a pending reservation ! Login to your profil to check it !</p>
            <a href=http://localhost:3000/profile> Click here</a>
            </div>`,
        }).catch(err => console.log(err));
    }

    async sendAcceptedoRefusedEmail(client_id, status) {
        
        const user = await this.usersRepository.findOne(client_id)
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
        if (status == "WAITING FOR CLIENT'S PAIEMENT") {
            transport.sendMail({
                from: "GIRLPOWER",
                to: user.email,
                subject: "Your reservation has been accepted",
                html: `<h1>Accpted Reservation</h1>
            <h2>Hello ${user.name}</h2>
            <p>The owner has accepted your reservation and he's now waiting for your paiement to complete the reservation</p>
            <p>Go to your profile page to checkout !</p>
            <a href=http://localhost:3000/profile> Click here</a>
            </div>`,
            }).catch(err => console.log(err));
        }

        if (status == "REFUSED") {
            transport.sendMail({
                from: "GIRLPOWER",
                to: user.email,
                subject: "Your reservation has been refused",
                html: `<h1>Refused Reservation</h1>
            <h2>Hello ${user.name}</h2>
            <p>We're sorry to announced you that the owner has not accepted your reservation !</p>
            <p>Feel free to search for another place on Ez.Rent !</p>
            <a href=http://localhost:3000/> Click here</a>
            </div>`,
            }).catch(err => console.log(err));
        }
    }
}
