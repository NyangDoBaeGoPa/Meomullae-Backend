import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class Answer {
  id: number;
  answer_content: string;
}

class Content {
  question_id: number;

  @ValidateNested({ each: true })
  @Type(() => Content)
  answers: Answer[];
}

export class CreateSurveyResultDto {
  survey_id: string;

  @ValidateNested({ each: true })
  @Type(() => Content)
  contents: Content[];
}
