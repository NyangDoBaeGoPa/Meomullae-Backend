import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SingleChoiceAnswerRepository } from './single_choice_answer.repository';
import { SurveyController } from './survey.controller';
import { SurveyRepository } from './survey.repository';
import { SurveyService } from './survey.service';
import { SurveyAnswerRepository } from './survey_answer.repository';
import { SurveyAnswerResultRepository } from './survey_answer_result.repository';
import { SurveyQuestionRepository } from './survey_question.repository';
import { SurveyResultRepository } from './survey_result.repository';
import { SurveySingleChoiceAnswerResultRepository } from './survey_single_choice_answer_result.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SurveyRepository,
      SurveyAnswerRepository,
      SurveyResultRepository,
      SingleChoiceAnswerRepository,
      SurveyAnswerResultRepository,
      SurveyQuestionRepository,
      SurveySingleChoiceAnswerResultRepository,
    ]),
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
