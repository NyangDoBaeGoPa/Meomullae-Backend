import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyQuestion } from '@root/entities/SurveyQuestion.entity';

import { SurveyController } from './survey.controller';
import { SurveyRepository } from './survey.repository';
import { SurveyService } from './survey.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyRepository, SurveyQuestion])],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
