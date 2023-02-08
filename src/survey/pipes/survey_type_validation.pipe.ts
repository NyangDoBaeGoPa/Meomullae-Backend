import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { isUndefined } from 'lodash';

export class SurveyTypeValidationPipe implements PipeTransform {
  readonly typeOptions = ['MBTI', 'Category'];

  transform(value: any, metadata: ArgumentMetadata) {
    if (isUndefined(value)) {
      throw new BadRequestException('타입 옵션 쿼리를 넣어주세요');
    }
    if (!this.isOptionValid(value)) {
      throw new BadRequestException(`${value} 는 타입 옵션이 아닙니다.`);
    }
    return value;
  }

  private isOptionValid(options: any) {
    const index = this.typeOptions.indexOf(options);
    return index !== -1;
  }
}
