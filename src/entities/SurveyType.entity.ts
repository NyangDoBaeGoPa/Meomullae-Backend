import { Column, Entity, Index, OneToMany } from 'typeorm';

import { Survey } from './Survey.entity';

@Index('survey_type_pkey', ['surveyTypeId'], { unique: true })
@Entity('survey_type', { schema: 'public' })
export class SurveyType {
  @Column('integer', { primary: true, name: 'survey_type_id' })
  surveyTypeId: number;

  @Column('character varying', { name: 'type_name' })
  typeName: string;

  @OneToMany(() => Survey, (survey) => survey.surveyType)
  surveys: Survey[];
}
