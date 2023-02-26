import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

class Answer {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsOptional()
  answer_content: string;
}

class Content {
  @ApiProperty()
  @IsNotEmpty()
  question_id: number;

  @ApiProperty({ isArray: true, type: Answer })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Answer)
  answers: Answer[];
}

export class CreateSurveyResultDto {
  @ApiProperty()
  @IsNotEmpty()
  surveyId: number;

  @ApiProperty({ isArray: true, type: Content })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Content)
  contents: Content[];
}
