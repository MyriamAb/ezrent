import { Controller, Post, Body, Get, Patch, Delete, Param, HttpStatus } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';

@Controller('reservations')
export class ReservationController {
    constructor(private service: ReservationService) { }

    @Get(':id')
    get(@Param() params) {
        return this.service.getReservation(params.id);
    }

    @Get()
    getReservations(reservation: Reservation) {
        return this.service.getReservations(reservation);
    }

    @Post()
    async postReservation(@Body() reservation: Reservation) {
        const postedReservation= await this.service.postReservation(reservation);
        return {
            statusCode: HttpStatus.OK,
            message: 'Reservation added successfully',
            data: postedReservation,
        };
    }

    @Patch(':id')
    async update(@Param() params,
           @Body() reservation: Reservation) {
        const updatedReservation = await this.service.updateReservation(params.id, reservation);
        return {
            statusCode: HttpStatus.OK,
            message: 'Reservation updated successfully',
            user: updatedReservation,
        };
    }

    @Delete(':id')
    deleteRent(@Param() params) {
        return this.service.deleteReservation(params.id)
    }
}
