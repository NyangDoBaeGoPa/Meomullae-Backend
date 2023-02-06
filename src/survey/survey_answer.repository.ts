import { EntityRepository, Repository } from 'typeorm';

import { Survey, SurveyAnswer } from '../entities';

@EntityRepository(SurveyAnswer)
export class SurveyAnswerRepository extends Repository<SurveyAnswer> {
  async getSurveyAnswers(survey: Survey): Promise<SurveyAnswer[]> {
    const answers = [];
    for (const question of survey['surveyQuestions']) {
      answers.push(
        await this.findOne({
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
