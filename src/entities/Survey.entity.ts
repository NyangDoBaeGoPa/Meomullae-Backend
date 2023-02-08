import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { SurveyQuestion } from './SurveyQuestion.entity';
import { SurveyType } from './SurveyType.entity';

@Index('survey_pkey', ['surveyId'], { unique: true })
@Entity('survey', { schema: 'public' })
export class Survey {
  @Column('integer', { primary: true, name: 'survey_id' })
  surveyId: number;

  @ManyToOne(() => SurveyType, (surveyType) => surveyType.surveys)
  @JoinColumn([{ name: 'survey_type_id', referencedColumnName: 'surveyTypeId' }])
  surveyType: SurveyType;

  @OneToMany(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.survey)
  surveyQuestions: SurveyQuestion[];
}
