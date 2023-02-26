import { ApiProperty } from '@nestjs/swagger';

abstract class SurveyAnswer {
  @ApiProperty()
  answer_id: number;

  @ApiProperty()
  answer_copy: string;

  @ApiProperty()
  answer_order: number;
}

abstract class SurveyContent {
  @ApiProperty()
  question_id: number;

  @ApiProperty()
  question_copy: string;

  @ApiProperty()
  question_order: number;

  @ApiProperty()
  answer_mode: string;

  @ApiProperty({ isArray: true, type: SurveyAnswer })
  answers: SurveyAnswer[];
}

export abstract class SurveyResponse {
  @ApiProperty()
  surveyId: number;

  @ApiProperty({ isArray: true, type: SurveyContent })
  contents: SurveyContent[];
}
