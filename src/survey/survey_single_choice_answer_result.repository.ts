import { SingleChoiceAnswer } from '@root/entities/SingleChoiceAnswer.entity';
import { SurveyAnswerResult } from '@root/entities/SurveyAnswerResult.entity';
import { SurveySingleChoiceAnswerResult } from '@root/entities/SurveySingleChoiceAnswerResult.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SurveySingleChoiceAnswerResult)
export class SurveySingleChoiceAnswerResultRepository extends Repository<SurveySingleChoiceAnswerResult> {
  async createSingleChoiceAnswerResult(
    answerResult: SurveyAnswerResult,
    singleChoiceAnswer: SingleChoiceAnswer,
  ) {
    const singleChoiceAnswerResult = this.create({
      answerResult,
      singleChoiceAnswer,
    });

    await this.save(singleChoiceAnswerResult);
    return singleChoiceAnswerResult;
  }
}
