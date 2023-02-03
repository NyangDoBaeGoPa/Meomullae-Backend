import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyAnswer } from '@root/entities/SurveyAnswer.entity';

import { SurveyController } from './survey.controller';
import { SurveyRepository } from './survey.repository';
import { SurveyService } from './survey.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyRepository, SurveyAnswer])],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
