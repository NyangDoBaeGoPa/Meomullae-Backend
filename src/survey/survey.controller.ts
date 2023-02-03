import { Controller, Get, Query } from '@nestjs/common';

import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}
  @Get('/')
  getSurveyByType(@Query('type') type: string) {
    return this.surveyService.find(type);
  }
}
