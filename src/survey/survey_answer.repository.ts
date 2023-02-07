import { EntityRepository, Repository } from 'typeorm';

import { Survey, SurveyAnswer } from '../entities';

@EntityRepository(SurveyAnswer)
export class SurveyAnswerRepository extends Repository<SurveyAnswer> {
  async getSurveyAnswers(survey: Survey): Promise<SurveyAnswer[]> {
    const answers = [];

    survey['surveyQuestions'].forEach(async (question) => {
      const { questionId } = question;
      const questionRelation = ['question', 'answerType', 'singleChoiceAnswers'];
      const questionQuery = {
        question: { questionId },
      };
      const answer = await this.findOne({
        relations: questionRelation,
        where: questionQuery,
      });
      answers.push(answer);
    });
    return answers;
  }
}
