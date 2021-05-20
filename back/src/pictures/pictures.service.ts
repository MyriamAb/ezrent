import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Picture } from './picture.entity';

@Injectable()
export class PicturesService {
    constructor(@InjectRepository(Picture) private picturesRepository: Repository<Picture>) { }

    async insertPicture(
        image_name: string,
        image_blob: BinaryType,
        rental_id: number,
    ) {
        const newPicture = new Picture();
        newPicture.image_name = image_name;
        newPicture.image_blob = image_blob;
        newPicture.rental_id = rental_id;
        const result = await this.picturesRepository.save(newPicture);
        return result;
    }

    async getPicture(id: number) {
        return await this.picturesRepository.find({rental_id: id})
    }

    async deletePicture(id: number) {
        const deletedPicture = await this.picturesRepository.findOne(id);
        const result = await this.picturesRepository.remove(deletedPicture);
        return result;
    }
}
