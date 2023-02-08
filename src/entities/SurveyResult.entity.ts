import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SurveyAnswerResult } from './SurveyAnswerResult.entity';
import { SurveyResultMBTI } from './SurveyResultMBTI.entity';
import { SurveyResultRestaurant } from './SurveyResultRestaurant.entity';

@Index('survey_result_pkey', ['resultId'], { unique: true })
@Entity('survey_result', { schema: 'public' })
export class SurveyResult {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'result_id' })
  resultId: number;

  @Column('integer', { name: 'total_feedback', nullable: true })
  totalFeedback: number | null;

  @OneToMany(() => SurveyAnswerResult, (surveyAnswerResult) => surveyAnswerResult.result)
  surveyAnswerResults: SurveyAnswerResult[];

  @OneToMany(() => SurveyResultMBTI, (surveyResultMbti) => surveyResultMbti.result)
  surveyResultMbtis: SurveyResultMBTI[];

  @OneToMany(
    () => SurveyResultRestaurant,
    (surveyResultRestaurant) => surveyResultRestaurant.result,
  )
  surveyResultRestaurants: SurveyResultRestaurant[];
}
