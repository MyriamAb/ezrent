import { Controller, Post, Body, Get, Patch, Delete, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './activity.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('activity')
export class ActivityController {
    constructor(private service: ActivityService) { }

    @Get()
    getActivities(activity) {
        return this.service.getActivities(activity);
    }

    @Get(':activity')
    getByActivity(@Param() params) {
        return this.service.getByActivity(params.activity);
    }

    @Post()
/*     @UseGuards(JwtAuthGuard)
 */    async postActivity(@Body() activity: Activity){
        const postedActivity= await this.service.postActivity(activity);
        return {
            statusCode: HttpStatus.OK,
            message: 'Activity added successfully',
            data: postedActivity,
        };    
    }
    
    @Delete(':id')
/*     @UseGuards(JwtAuthGuard)
 */    deleteActivity(@Param() params) {
        return this.service.deleteActivity(params.id)
    }
}
