import { EntityRepository, Repository } from 'typeorm';

import { Survey, SurveyAnswer } from '../entities';

@EntityRepository(SurveyAnswer)
export class SurveyAnswerRepository extends Repository<SurveyAnswer> {
  async getSurveyAnswers(survey: Survey): Promise<SurveyAnswer[]> {
    const answers = [];

    const promises = survey['surveyQuestions'].map(async (question) => {
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

    await Promise.all(promises);
    return answers;
  }
}
