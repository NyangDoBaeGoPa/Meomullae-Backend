import { Column, Entity, Index, OneToMany } from 'typeorm';

import { MBTIContent } from './MBTIContent.entity';
import { MBTIRelationship } from './MBTIRelationship.entity';
import { SurveyResultMBTI } from './SurveyResultMBTI.entity';

@Index('MBTI_result_pkey', ['mbtiId'], { unique: true })
@Entity('MBTI_result', { schema: 'public' })
export class MBTIResult {
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

  @OneToMany(() => MBTIContent, (mbtiContent) => mbtiContent.mbti)
  mbtiContents: MBTIContent[];

  @OneToMany(() => MBTIRelationship, (mbtiRelationship) => mbtiRelationship.matchMbti)
  mbtiRelationships: MBTIRelationship[];

  @OneToMany(() => MBTIRelationship, (mbtiRelationship) => mbtiRelationship.mbti)
  mbtiRelationships2: MBTIRelationship[];

  @OneToMany(() => SurveyResultMBTI, (surveyResultMbti) => surveyResultMbti.mbti)
  surveyResultMbtis: SurveyResultMBTI[];
}
