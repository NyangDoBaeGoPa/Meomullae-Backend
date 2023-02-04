import { Repository, EntityRepository } from 'typeorm';

import { Survey } from '../entities/Survey.entity';

@EntityRepository(Survey)
export class SurveyRepository extends Repository<Survey> {
  async getSurveyByType(type: string): Promise<Survey> {
    return await this.findOne({
      relations: ['surveyQuestions', 'surveyType'],
      where: {
        surveyType: {
          typeName: type,
        },
      },
    });
  }
}
