import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';

@Injectable()
export class ActivityService {
    constructor(@InjectRepository(Activity) private activitiesRepository: Repository<Activity>) { }

    async getActivities(activity: Activity): Promise<Activity[]> {
        return await this.activitiesRepository.find();    
    }

    async getByActivity(activity: string): Promise<Activity[]> {
        return await this.activitiesRepository.find({
            select: [
                "rental_id"
            ],
            where: [{ [activity]:true}]
        });  
    }
}
