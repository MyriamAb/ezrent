import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
    constructor(@InjectRepository(Review) private reviewsRepository: Repository<Review>) { }

    async insertReview(
        grade: number,
        comment: string,
        reviewed_id: number,
        reviewer_id: number,
    ) {
        const newReview = new Review();
        newReview.grade = grade;
        newReview.comment = comment;
        newReview.reviewed_id = reviewed_id;
        newReview.reviewer_id = reviewer_id;
        const result = await this.reviewsRepository.save(newReview);
        return result;
    }

    async getReviewsByUserId(id: number) {
        return await this.reviewsRepository.find({ reviewed_id: id })
    }
}
