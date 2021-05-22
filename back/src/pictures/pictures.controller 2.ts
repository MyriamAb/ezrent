import { Controller, Post, Body, Get, Patch, Delete, Param, HttpService, HttpStatus } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { Picture } from './picture.entity';

@Controller('pictures')
export class PicturesController {
    constructor(private picturesService: PicturesService) { }
    
    @Post()
    async post(
        @Body('image_name') pictureName: string,
        @Body('image_blob') pictureBlob: BinaryType,
        @Body('rental_id') pictureRental: number,
    ) {
        const picture = await this.picturesService.insertPicture(
            pictureName,
            pictureBlob,
            pictureRental
        );
        return {
            statusCode: HttpStatus.OK,
            message: "Picture added successfully",
            data: picture,
        }
    }

    @Get(':id')
    async get(@Param() params) {
        return this.picturesService.getPicture(params.id);
    }

    @Delete(':id')
    deletePicture(@Param() params) {
        const picture = this.picturesService.deletePicture(params.id)
        return {
            statusCode: HttpStatus.OK,
            message: 'Picture deleted successfully',
            data: picture,
        };
    }
}