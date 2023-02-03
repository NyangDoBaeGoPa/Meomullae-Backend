import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SurveyAnswerResult } from './SurveyAnswerResult.entity';
import { SurveyResultMbti } from './SurveyResultMbti.entity';
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

  @OneToMany(() => SurveyResultMbti, (surveyResultMbti) => surveyResultMbti.result)
  surveyResultMbtis: SurveyResultMbti[];

  @OneToMany(
    () => SurveyResultRestaurant,
    (surveyResultRestaurant) => surveyResultRestaurant.result,
  )
  surveyResultRestaurants: SurveyResultRestaurant[];
}
