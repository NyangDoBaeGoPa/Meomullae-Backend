import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyAnswer } from '@root/entities/SurveyAnswer.entity';
import { Repository } from 'typeorm';

import { SurveyRepository } from './survey.repository';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyRepository)
    private surveyRepository: SurveyRepository,

    @InjectRepository(SurveyAnswer)
    private surveyAnswerRepository: Repository<SurveyAnswer>,
  ) {}

  async getSurveyByType(type: string): Promise<any[]> {
    const survey = await this.surveyRepository.getSurveyByType(type);
    const answers = [];
    for (const question of survey[0]['surveyQuestions']) {
      answers.push(
        await this.surveyAnswerRepository.find({
          relations: ['question', 'answerType', 'singleChoiceAnswers'],
          where: {
            question: {
              questionId: question.questionId,
            },
          },
        }),
      );
    }
    return answers;
  }
}
