import { Controller, Get, Query } from '@nestjs/common';

import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}
  @Get('/')
  getSurveyByType(@Query('type') type: string): Promise<any[]> {
    return this.surveyService.getSurveyByType(type);
  }
}
