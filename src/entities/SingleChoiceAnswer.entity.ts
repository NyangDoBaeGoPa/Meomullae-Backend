import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { SurveyAnswer } from './SurveyAnswer.entity';
import { SurveySingleChoiceAnswerResult } from './SurveySingleChoiceAnswerResult.entity';

@Index('multiple_answer_pkey', ['singleChoiceAnswerId'], { unique: true })
@Entity('single_choice_answer', { schema: 'public' })
export class SingleChoiceAnswer {
  @Column('integer', { primary: true, name: 'single_choice_answer_id' })
  singleChoiceAnswerId: number;

  @Column('character varying', { name: 'answer_content' })
  answerContent: string;

  @Column('integer', { name: 'order' })
  order: number;

  @ManyToOne(() => SurveyAnswer, (surveyAnswer) => surveyAnswer.singleChoiceAnswers)
  @JoinColumn([{ name: 'answer_id', referencedColumnName: 'answerId' }])
  answer: SurveyAnswer;

  @OneToMany(
    () => SurveySingleChoiceAnswerResult,
    (surveySingleChoiceAnswerResult) => surveySingleChoiceAnswerResult.singleChoiceAnswer,
  )
  surveySingleChoiceAnswerResults: SurveySingleChoiceAnswerResult[];
}
