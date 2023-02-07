import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MBTIResult } from './MBTIResult.entity';
import { SurveyResult } from './SurveyResult.entity';

@Index('survey_result_mbti_pkey', ['surveyResultMbtiId'], { unique: true })
@Entity('survey_result_mbti', { schema: 'public' })
export class SurveyResultMBTI {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'survey_result_mbti_id' })
  surveyResultMbtiId: number;

  @ManyToOne(() => MBTIResult, (mbtiResult) => mbtiResult.surveyResultMbtis)
  @JoinColumn([{ name: 'mbti_id', referencedColumnName: 'mbtiId' }])
  mbti: MBTIResult;

  @ManyToOne(() => SurveyResult, (surveyResult) => surveyResult.surveyResultMbtis)
  @JoinColumn([{ name: 'result_id', referencedColumnName: 'resultId' }])
  result: SurveyResult;
}
