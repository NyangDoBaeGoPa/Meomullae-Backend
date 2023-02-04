import { Survey } from '@root/entities/Survey.entity';
import { SurveyAnswer } from '@root/entities/SurveyAnswer.entity';
import { Repository, EntityRepository } from 'typeorm';

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
