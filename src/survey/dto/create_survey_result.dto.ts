import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

class Answer {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  answer_content: string;
}

class Content {
  @IsNotEmpty()
  question_id: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Answer)
  answers: Answer[];
}

export class CreateSurveyResultDto {
  @IsNotEmpty()
  surveyId: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Content)
  contents: Content[];
}
