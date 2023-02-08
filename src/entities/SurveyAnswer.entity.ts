import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AnswerType } from './AnswerType.entity';
import { SingleChoiceAnswer } from './SingleChoiceAnswer.entity';
import { SurveyQuestion } from './SurveyQuestion.entity';

@Index('survey_answer_pkey', ['answerId'], { unique: true })
@Entity('survey_answer', { schema: 'public' })
export class SurveyAnswer {
  @Column('integer', { primary: true, name: 'answer_id' })
  answerId: number;

  @OneToMany(() => SingleChoiceAnswer, (singleChoiceAnswer) => singleChoiceAnswer.answer)
  singleChoiceAnswers: SingleChoiceAnswer[];

  @ManyToOne(() => AnswerType, (answerType) => answerType.surveyAnswers)
  @JoinColumn([{ name: 'answer_type_id', referencedColumnName: 'answerTypeId' }])
  answerType: AnswerType;

  @ManyToOne(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.surveyAnswers)
  @JoinColumn([{ name: 'question_id', referencedColumnName: 'questionId' }])
  question: SurveyQuestion;
}
