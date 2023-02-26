import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiQuery,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '@root/swagger/response/error.response';
import { SurveyResultResponse } from '@root/swagger/response/survey.result.response';

import { SurveyResponse } from '../swagger/response/survey.response';

import { CreateSurveyResultDto } from './dto/create_survey_result.dto';
import { SurveyTypeValidationPipe } from './pipes/survey_type_validation.pipe';
import { SurveyService } from './survey.service';

@Controller('survey')
@ApiTags('설문 API')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  @Get('/')
  @ApiOperation({ summary: '설문 가져오기 API', description: '타입에 따른 전체 설문을 가져온다.' })
  @ApiQuery({ name: 'type', required: true, description: '불러올 설문 타입(MBTI, Category)' })
  @ApiCreatedResponse({ description: '설문 가져오기 성공', type: SurveyResponse })
  @ApiBadRequestResponse({ description: '잘못된 쿼리', type: ErrorResponse })
  getSurveyByType(@Query('type', SurveyTypeValidationPipe) type: string): Promise<Object> {
    return this.surveyService.getSurveyByType(type);
  }

  @Post('/')
  @ApiOperation({ summary: '설문 결과 저장하기 API', description: '설문 결과를 저장한다.' })
  @ApiCreatedResponse({ description: '설문 저장하기 성공', type: SurveyResultResponse })
  @ApiBadRequestResponse({
    description: '존재하지 않는 question_id, answer_id',
    type: ErrorResponse,
  })
  createSurveyResult(@Body() createSurveyResultDto: CreateSurveyResultDto): Promise<Object> {
    return this.surveyService.createSurveyResult(createSurveyResultDto);
  }
}
