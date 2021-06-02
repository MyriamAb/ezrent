import { Controller, Post, Body, Get, Patch, Delete, Param, HttpService, HttpStatus, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './review.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'


@Controller('reviews')
export class ReviewsController {
    constructor(private reviewsService: ReviewsService) { }

    @Post()
/*     @UseGuards(JwtAuthGuard)
 */    async post(
        @Body('grade') reviewGrade: number,
        @Body('comment') reviewComment: string,
        @Body('reviewed_id') reviewedId: number,
        @Body('reviewer_id') reviewerId: number,
    ) {
        const review = await this.reviewsService.insertReview(
            reviewGrade,
            reviewComment,
            reviewedId,
            reviewerId,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Review added successfully',
            data: review,
        };
    }

    @Get(':id')
    get(@Param() params) {
        return this.reviewsService.getReviewsByUserId(params.id)
    }

    @Get()
    getAll() {
        return this.reviewsService.getAllReviews()
    }


}
