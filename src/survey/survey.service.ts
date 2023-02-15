import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSurveyResultDto } from './dto/create_survey_result.dto';
import { SurveyRepository } from './survey.repository';
import { SurveyAnswerRepository } from './survey_answer.repository';
import { SurveyResultRepository } from './survey_result.repository';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyRepository)
    private surveyRepository: SurveyRepository,

    @InjectRepository(SurveyAnswerRepository)
    private surveyAnswerRepository: SurveyAnswerRepository,

    @InjectRepository(SurveyResultRepository)
    private surveyResultRepository: SurveyResultRepository,
  ) {}

  async getSurveyByType(type: string): Promise<Object> {
    const survey = await this.surveyRepository.getSurveyByType(type);
    const answers = await this.surveyAnswerRepository.getSurveyAnswers(survey);

    return {
      surveyId: survey.surveyId,
      contents: answers.map((e) => {
        return {
          question_id: e.question.questionId,
          question_copy: e.question.questionContent,
          question_order: e.question.order,
          answer_mode: e.answerType.typeName,
          answers: e.singleChoiceAnswers.map((e) => {
            return {
              answer_id: e.singleChoiceAnswerId,
              answer_copy: e.answerContent,
              answer_order: e.order,
            };
          }),
        };
      }),
    };
  }

  async createSurveyResult(createSurveyResultDto: CreateSurveyResultDto) {
    return this.surveyResultRepository.createSurveyResult();
  }
}
