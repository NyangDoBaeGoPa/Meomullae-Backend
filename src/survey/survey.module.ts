import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SurveyController } from './survey.controller';
import { SurveyRepository } from './survey.repository';
import { SurveyService } from './survey.service';
import { SurveyAnswerRepository } from './survey_answer.repository';
import { SurveyResultRepository } from './survey_result.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SurveyRepository, SurveyAnswerRepository, SurveyResultRepository]),
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
