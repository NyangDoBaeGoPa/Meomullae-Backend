import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeORMConfig } from './configs/typeorm.config';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), SurveyModule],
})
export class AppModule {}
