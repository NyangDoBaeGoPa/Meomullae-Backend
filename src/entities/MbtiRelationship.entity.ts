import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MBTIResult } from './MBTIResult.entity';

@Index('MBTI_relationship_pkey', ['mbtiRelationshipId'], { unique: true })
@Entity('MBTI_relationship', { schema: 'public' })
export class MBTIRelationship {
  @Column('boolean', { name: 'is_positive' })
  isPositive: boolean;

  @PrimaryGeneratedColumn({ type: 'integer', name: 'mbti_relationship_id' })
  mbtiRelationshipId: number;

  @ManyToOne(() => MBTIResult, (mbtiResult) => mbtiResult.mbtiRelationships)
  @JoinColumn([{ name: 'match_mbti_id', referencedColumnName: 'mbtiId' }])
  matchMbti: MBTIResult;

  @ManyToOne(() => MBTIResult, (mbtiResult) => mbtiResult.mbtiRelationships2)
  @JoinColumn([{ name: 'mbti_id', referencedColumnName: 'mbtiId' }])
  mbti: MBTIResult;
}
