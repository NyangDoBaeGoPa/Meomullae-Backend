import { SurveyResult } from '@root/entities/SurveyResult.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SurveyResult)
export class SurveyResultRepository extends Repository<SurveyResult> {
  async createSurveyResult(): Promise<SurveyResult> {
    const result = this.create({});

    await this.save(result);
    return result;
  }
}
