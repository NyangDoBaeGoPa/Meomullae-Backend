import { Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SurveyQuestion } from './SurveyQuestion.entity';
import { SurveyResult } from './SurveyResult.entity';
import { SurveySingleChoiceAnswerResult } from './SurveySingleChoiceAnswerResult.entity';

@Index('survey_answer_result_pkey', ['answerResultId'], { unique: true })
@Entity('survey_answer_result', { schema: 'public' })
export class SurveyAnswerResult {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'answer_result_id' })
  answerResultId: number;

  @ManyToOne(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.surveyAnswerResults)
  @JoinColumn([{ name: 'question_id', referencedColumnName: 'questionId' }])
  question: SurveyQuestion;

  @ManyToOne(() => SurveyResult, (surveyResult) => surveyResult.surveyAnswerResults)
  @JoinColumn([{ name: 'result_id', referencedColumnName: 'resultId' }])
  result: SurveyResult;

  @OneToMany(
    () => SurveySingleChoiceAnswerResult,
    (surveySingleChoiceAnswerResult) => surveySingleChoiceAnswerResult.answerResult,
  )
  surveySingleChoiceAnswerResults: SurveySingleChoiceAnswerResult[];
}
