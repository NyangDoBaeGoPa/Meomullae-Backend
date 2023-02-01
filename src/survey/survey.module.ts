import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SurveyController } from './survey.controller';
import { SurveyRepository } from './survey.repository';
import { SurveyService } from './survey.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyRepository])],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
