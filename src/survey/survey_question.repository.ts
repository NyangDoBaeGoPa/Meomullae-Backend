import { SurveyQuestion } from '@root/entities/SurveyQuestion.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SurveyQuestion)
export class SurveyQuestionRepository extends Repository<SurveyQuestion> {}
