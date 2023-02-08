import { Controller, Get, Query } from '@nestjs/common';

import { SurveyTypeValidationPipe } from './pipes/survey_type_validation.pipe';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}
  @Get('/')
  getSurveyByType(@Query('type', SurveyTypeValidationPipe) type: string): Promise<Object> {
    return this.surveyService.getSurveyByType(type);
  }
}
