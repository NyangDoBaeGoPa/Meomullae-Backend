import { Controller, Get, Param } from '@nestjs/common';

import { Survey } from './survey.entity';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}
  @Get('/')
  getBoardById(@Param('id') id: number): Promise<Survey> {
    return this.surveyService.findAll();
  }
}
