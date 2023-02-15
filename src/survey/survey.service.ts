import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyResult } from '@root/entities/SurveyResult.entity';

import { CreateSurveyResultDto } from './dto/create_survey_result.dto';
import { SingleChoiceAnswerRepository } from './single_choice_answer.repository';
import { SurveyRepository } from './survey.repository';
import { SurveyAnswerRepository } from './survey_answer.repository';
import { SurveyAnswerResultRepository } from './survey_answer_result.repository';
import { SurveyQuestionRepository } from './survey_question.repository';
import { SurveyResultRepository } from './survey_result.repository';
import { SurveySingleChoiceAnswerResultRepository } from './survey_single_choice_answer_result.repository';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyRepository)
    private surveyRepository: SurveyRepository,

    @InjectRepository(SurveyAnswerRepository)
    private surveyAnswerRepository: SurveyAnswerRepository,

    @InjectRepository(SingleChoiceAnswerRepository)
    private singleChoiceAnswerRepository: SingleChoiceAnswerRepository,

    @InjectRepository(SurveyQuestionRepository)
    private surveyQuestionRepository: SurveyQuestionRepository,

    @InjectRepository(SurveyResultRepository)
    private surveyResultRepository: SurveyResultRepository,

    @InjectRepository(SurveyAnswerResultRepository)
    private surveyAnswerResultRepository: SurveyAnswerResultRepository,

    @InjectRepository(SurveySingleChoiceAnswerResultRepository)
    private surveySingleChoiceAnswerResultRepository: SurveySingleChoiceAnswerResultRepository,
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

  async createSurveyResult(createSurveyResultDto: CreateSurveyResultDto): Promise<SurveyResult> {
    const { contents } = createSurveyResultDto;
    const surveyResult = await this.surveyResultRepository.createSurveyResult();

    contents.map(async (content) => {
      const questionId = content.question_id;
      const surveyQuestion = await this.surveyQuestionRepository.findOne(questionId);
      const surveyAnswerResult = await this.surveyAnswerResultRepository.createSurveyAnswerResult(
        surveyResult,
        surveyQuestion,
      );

      content.answers.map(async (answer) => {
        // if(!isEmpty(answer.answer_content)) // 주관식 처리
        const surveyAnswer = await this.singleChoiceAnswerRepository.findOne(answer.id);
        await this.surveySingleChoiceAnswerResultRepository.createSingleChoiceAnswerResult(
          surveyAnswerResult,
          surveyAnswer,
        );
      });
    });

    return surveyResult;
  }
}
