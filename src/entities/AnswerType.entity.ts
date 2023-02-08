import { Column, Entity, Index, OneToMany } from 'typeorm';

import { SurveyAnswer } from './SurveyAnswer.entity';

@Index('question_type_pkey', ['answerTypeId'], { unique: true })
@Entity('answer_type', { schema: 'public' })
export class AnswerType {
  @Column('integer', { primary: true, name: 'answer_type_id' })
  answerTypeId: number;

  @Column('character varying', { name: 'type_name' })
  typeName: string;

  @OneToMany(() => SurveyAnswer, (surveyAnswer) => surveyAnswer.answerType)
  surveyAnswers: SurveyAnswer[];
}
