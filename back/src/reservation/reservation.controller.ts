import { Controller, Post, Body, Get, Patch, Delete, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'


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
/*     @UseGuards(JwtAuthGuard)
 */    async postReservation(@Body() reservation: Reservation) {
        const postedReservation= await this.service.postReservation(reservation);
        return {
            statusCode: HttpStatus.OK,
            message: 'Reservation added successfully',
            data: postedReservation,
        };
    }

    @Patch(':id')
/*     @UseGuards(JwtAuthGuard)
 */    async update(@Param() params,
           @Body() reservation: Reservation) {
        const updatedReservation = await this.service.updateReservation(params.id, reservation);
        return {
            statusCode: HttpStatus.OK,
            message: 'Reservation updated successfully',
            data: updatedReservation,
        };
    }

    @Delete(':id')
/*     @UseGuards(JwtAuthGuard)
 */    deleteRent(@Param() params) {
        return this.service.deleteReservation(params.id)
    }
}
