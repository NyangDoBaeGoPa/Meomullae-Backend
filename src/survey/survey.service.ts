import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Survey } from './survey.entity';
import { SurveyRepository } from './survey.repository';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyRepository)
    private surveyRepository: SurveyRepository,
  ) {}

  async findAll(): Promise<Survey> {
    const survey = await this.surveyRepository.findOne(1);

    return survey;
  }
}
