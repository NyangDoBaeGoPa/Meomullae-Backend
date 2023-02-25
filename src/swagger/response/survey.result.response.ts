import { ApiProperty } from '@nestjs/swagger';

export abstract class SurveyResultResponse {
  @ApiProperty()
  surveyResultId: number;
}
