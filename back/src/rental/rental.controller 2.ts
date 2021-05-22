import { Controller, Post, Body, Get, Patch, Delete, Param, HttpStatus } from '@nestjs/common';
import { RentalService } from './rental.service';
import { Rental } from './rental.entity';

@Controller('rentals')
export class RentalController {
    constructor(private service: RentalService) { }

    @Get(':id')
    get(@Param() params) {
        return this.service.getRental(params.id);
    }

    @Get()
    getRentals(rental: Rental) {
        return this.service.getRentals(rental);
    }

    @Post()
    async postRental(@Body() rental: Rental) {
        const postedRental= await this.service.postRental(rental);
        return {
            statusCode: HttpStatus.OK,
            message: 'Rental added successfully',
            data: postedRental,
        };
    }

    @Patch(':id')
    async update(@Param() params,
           @Body() rental: Rental) {
        const updatedRental = await this.service.updateRent(params.id, rental);
        return {
            statusCode: HttpStatus.OK,
            message: 'Rental updated successfully',
            user: updatedRental,
        };
    }

    @Delete(':id')
    deleteRent(@Param() params) {
        return this.service.deleteRental(params.id)
    }
}
