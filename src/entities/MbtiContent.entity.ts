import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MbtiResult } from './MbtiResult.entity';

@Index('MBTI_content_pkey', ['mbtiContentId'], { unique: true })
@Entity('MBTI_content', { schema: 'public' })
export class MbtiContent {
  @Column('character varying', { name: 'content' })
  content: string;

  @PrimaryGeneratedColumn({ type: 'integer', name: 'mbti_content_id' })
  mbtiContentId: number;

  @ManyToOne(() => MbtiResult, (mbtiResult) => mbtiResult.mbtiContents)
  @JoinColumn([{ name: 'mbti_id', referencedColumnName: 'mbtiId' }])
  mbti: MbtiResult;
}
