import { Controller, Post, Body, Get, Patch, Delete, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { RentalService } from './rental.service';
import { Rental } from './rental.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
/*     @UseGuards(JwtAuthGuard)
 */    async postRental(@Body() rental: Rental) {
        const postedRental= await this.service.postRental(rental);
        return {
            statusCode: HttpStatus.OK,
            message: 'Rental added successfully',
            data: postedRental,
        }
    }

    @Patch(':id')
/*     @UseGuards(JwtAuthGuard)
 */    async update(@Param() params,
           @Body() rental: Rental) {
        const updatedRental = await this.service.updateRent(params.id, rental);
        return {
            statusCode: HttpStatus.OK,
            message: 'Rental updated successfully',
            user: updatedRental,
        };
    }

    @Delete(':id')
/*     @UseGuards(JwtAuthGuard)
 */    deleteRent(@Param() params) {
        return this.service.deleteRental(params.id)
    }
}
