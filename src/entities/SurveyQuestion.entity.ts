import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Survey } from './Survey.entity';
import { SurveyAnswer } from './SurveyAnswer.entity';
import { SurveyAnswerResult } from './SurveyAnswerResult.entity';

@Index('survey_question_pkey', ['questionId'], { unique: true })
@Entity('survey_question', { schema: 'public' })
export class SurveyQuestion {
  @Column('integer', { primary: true, name: 'question_id' })
  questionId: number;

  @Column('character varying', { name: 'question_content' })
  questionContent: string;

  @Column('integer', { name: 'order' })
  order: number;

  @OneToMany(() => SurveyAnswer, (surveyAnswer) => surveyAnswer.question)
  surveyAnswers: SurveyAnswer[];

  @OneToMany(() => SurveyAnswerResult, (surveyAnswerResult) => surveyAnswerResult.question)
  surveyAnswerResults: SurveyAnswerResult[];

  @ManyToOne(() => Survey, (survey) => survey.surveyQuestions)
  @JoinColumn([{ name: 'survey_id', referencedColumnName: 'surveyId' }])
  survey: Survey;
}
