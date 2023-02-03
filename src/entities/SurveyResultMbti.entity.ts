import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MbtiResult } from './MbtiResult.entity';
import { SurveyResult } from './SurveyResult.entity';

@Index('survey_result_mbti_pkey', ['surveyResultMbtiId'], { unique: true })
@Entity('survey_result_mbti', { schema: 'public' })
export class SurveyResultMbti {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'survey_result_mbti_id' })
  surveyResultMbtiId: number;

  @ManyToOne(() => MbtiResult, (mbtiResult) => mbtiResult.surveyResultMbtis)
  @JoinColumn([{ name: 'mbti_id', referencedColumnName: 'mbtiId' }])
  mbti: MbtiResult;

  @ManyToOne(() => SurveyResult, (surveyResult) => surveyResult.surveyResultMbtis)
  @JoinColumn([{ name: 'result_id', referencedColumnName: 'resultId' }])
  result: SurveyResult;
}
