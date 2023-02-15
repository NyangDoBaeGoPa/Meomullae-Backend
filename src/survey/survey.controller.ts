import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateSurveyResultDto } from './dto/create_survey_result.dto';
import { SurveyTypeValidationPipe } from './pipes/survey_type_validation.pipe';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}
  @Get('/')
  getSurveyByType(@Query('type', SurveyTypeValidationPipe) type: string): Promise<Object> {
    return this.surveyService.getSurveyByType(type);
  }

  @Post('/')
  createSurveyResult(@Body() createSurveyResultDto: CreateSurveyResultDto) {
    return this.surveyService.createSurveyResult(createSurveyResultDto);
  }
}
