import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';

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

  async createSurveyResult(createSurveyResultDto: CreateSurveyResultDto): Promise<Object> {
    let surveyResultId: number;
    const { contents } = createSurveyResultDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    const queryManager = queryRunner.manager;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const surveyResult = await queryManager
        .getCustomRepository(SurveyResultRepository)
        .createSurveyResult();
      surveyResultId = surveyResult.resultId;

      const promises = contents.map(async (content) => {
        const questionId = content.question_id;
        const surveyQuestion = await queryManager
          .getCustomRepository(SurveyQuestionRepository)
          .findOne(questionId);

        const surveyAnswerResult = await queryManager
          .getCustomRepository(SurveyAnswerResultRepository)
          .createSurveyAnswerResult(surveyResult, surveyQuestion);

        const promises = content.answers.map(async (answer) => {
          // if(!isEmpty(answer.answer_content)) // 주관식 처리
          const surveyAnswer = await queryManager
            .getCustomRepository(SingleChoiceAnswerRepository)
            .findOne(answer.id);

          await queryManager
            .getCustomRepository(SurveySingleChoiceAnswerResultRepository)
            .createSingleChoiceAnswerResult(surveyAnswerResult, surveyAnswer);
        });

        await Promise.all(promises);
      });

      await Promise.all(promises);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err.code === '23502' && err.column === 'question_id')
        throw new BadRequestException('잘못된 question_id 입니다');
      if (err.code === '23502' && err.column === 'single_choice_answer_id')
        throw new BadRequestException('잘못된 answer_id 입니다');
    } finally {
      await queryRunner.release();
    }

    return { surveyResultId };
  }
}
