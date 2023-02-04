import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class SurveyTypeValidationPipe implements PipeTransform {
  readonly typeOptions = ['MBTI', 'Category'];

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('survey type is empty');
    }
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the type options`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.typeOptions.indexOf(status);
    return index !== -1;
  }
}
