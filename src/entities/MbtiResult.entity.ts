import { Column, Entity, Index, OneToMany } from 'typeorm';

import { MbtiContent } from './MbtiContent.entity';
import { MbtiRelationship } from './MbtiRelationship.entity';
import { SurveyResultMbti } from './SurveyResultMbti.entity';

@Index('MBTI_result_pkey', ['mbtiId'], { unique: true })
@Entity('MBTI_result', { schema: 'public' })
export class MbtiResult {
  @Column('integer', { primary: true, name: 'mbti_id' })
  mbtiId: number;

  @Column('character varying', { name: 'mbti_name' })
  mbtiName: string;

  @Column('character varying', { name: 'mbti_image' })
  mbtiImage: string;

  @Column('character varying', { name: 'short_description' })
  shortDescription: string;

  @Column('character varying', { name: 'mbti_type' })
  mbtiType: string;

  @OneToMany(() => MbtiContent, (mbtiContent) => mbtiContent.mbti)
  mbtiContents: MbtiContent[];

  @OneToMany(() => MbtiRelationship, (mbtiRelationship) => mbtiRelationship.matchMbti)
  mbtiRelationships: MbtiRelationship[];

  @OneToMany(() => MbtiRelationship, (mbtiRelationship) => mbtiRelationship.mbti)
  mbtiRelationships2: MbtiRelationship[];

  @OneToMany(() => SurveyResultMbti, (surveyResultMbti) => surveyResultMbti.mbti)
  surveyResultMbtis: SurveyResultMbti[];
}
