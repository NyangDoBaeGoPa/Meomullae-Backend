import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '@root/entities/Survey.entity';

import { SurveyRepository } from './survey.repository';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyRepository)
    private surveyRepository: SurveyRepository,
  ) {}

  async find(type: string): Promise<Survey[]> {
    return this.surveyRepository.getSurveyByType(type);
  }
}
