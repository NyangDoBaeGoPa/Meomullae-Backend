import { SurveyAnswerResult } from '@root/entities/SurveyAnswerResult.entity';
import { SurveyQuestion } from '@root/entities/SurveyQuestion.entity';
import { SurveyResult } from '@root/entities/SurveyResult.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SurveyAnswerResult)
export class SurveyAnswerResultRepository extends Repository<SurveyAnswerResult> {
  async createSurveyAnswerResult(result: SurveyResult, question: SurveyQuestion) {
    const answerResult = this.create({
      result,
      question,
    });

    await this.save(answerResult);
    return answerResult;
  }
}
