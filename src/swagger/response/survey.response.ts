import { ApiProperty } from '@nestjs/swagger';

abstract class Answer {
  @ApiProperty()
  answer_id: number;

  @ApiProperty()
  answer_copy: string;

  @ApiProperty()
  answer_order: number;
}

abstract class Content {
  @ApiProperty()
  question_id: number;

  @ApiProperty()
  question_copy: string;

  @ApiProperty()
  question_order: number;

  @ApiProperty()
  answer_mode: string;

  @ApiProperty({ isArray: true, type: Answer })
  answers: Answer[];
}

export abstract class SurveyResponse {
  @ApiProperty()
  surveyId: number;

  @ApiProperty({ isArray: true, type: Content })
  contents: Content[];
}
