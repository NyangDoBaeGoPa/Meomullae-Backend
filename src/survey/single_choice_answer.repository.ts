import { SingleChoiceAnswer } from '@root/entities/SingleChoiceAnswer.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SingleChoiceAnswer)
export class SingleChoiceAnswerRepository extends Repository<SingleChoiceAnswer> {}
