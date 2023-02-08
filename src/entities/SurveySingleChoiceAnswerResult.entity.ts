import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SingleChoiceAnswer } from './SingleChoiceAnswer.entity';
import { SurveyAnswerResult } from './SurveyAnswerResult.entity';

@Index('survey_single_choice_answer_result_pkey', ['surveySingleChoiceAnswerResultId'], {
  unique: true,
})
@Entity('survey_single_choice_answer_result', { schema: 'public' })
export class SurveySingleChoiceAnswerResult {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'survey_single_choice_answer_result_id',
  })
  surveySingleChoiceAnswerResultId: number;

  @ManyToOne(
    () => SurveyAnswerResult,
    (surveyAnswerResult) => surveyAnswerResult.surveySingleChoiceAnswerResults,
  )
  @JoinColumn([{ name: 'answer_result_id', referencedColumnName: 'answerResultId' }])
  answerResult: SurveyAnswerResult;

  @ManyToOne(
    () => SingleChoiceAnswer,
    (singleChoiceAnswer) => singleChoiceAnswer.surveySingleChoiceAnswerResults,
  )
  @JoinColumn([
    {
      name: 'single_choice_answer_id',
      referencedColumnName: 'singleChoiceAnswerId',
    },
  ])
  singleChoiceAnswer: SingleChoiceAnswer;
}
