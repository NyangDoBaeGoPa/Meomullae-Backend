import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SurveyRepository } from './survey.repository';
import { SurveyAnswerRepository } from './survey_answer.repository';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyRepository)
    private surveyRepository: SurveyRepository,

    @InjectRepository(SurveyAnswerRepository)
    private surveyAnswerRepository: SurveyAnswerRepository,
  ) {}

  async getSurveyByType(type: string): Promise<any[]> {
    const survey = await this.surveyRepository.getSurveyByType(type);
    const answers = await this.surveyAnswerRepository.getSurveyAnswers(survey);
    return answers;
  }
}
