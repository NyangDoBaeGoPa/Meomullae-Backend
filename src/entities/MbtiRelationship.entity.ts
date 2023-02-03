import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MbtiResult } from './MbtiResult.entity';

@Index('MBTI_relationship_pkey', ['mbtiRelationshipId'], { unique: true })
@Entity('MBTI_relationship', { schema: 'public' })
export class MbtiRelationship {
  @Column('boolean', { name: 'is_positive' })
  isPositive: boolean;

  @PrimaryGeneratedColumn({ type: 'integer', name: 'mbti_relationship_id' })
  mbtiRelationshipId: number;

  @ManyToOne(() => MbtiResult, (mbtiResult) => mbtiResult.mbtiRelationships)
  @JoinColumn([{ name: 'match_mbti_id', referencedColumnName: 'mbtiId' }])
  matchMbti: MbtiResult;

  @ManyToOne(() => MbtiResult, (mbtiResult) => mbtiResult.mbtiRelationships2)
  @JoinColumn([{ name: 'mbti_id', referencedColumnName: 'mbtiId' }])
  mbti: MbtiResult;
}
