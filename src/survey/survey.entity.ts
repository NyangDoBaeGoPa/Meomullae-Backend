import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  survey_id: number;

  @Column()
  survey_type_id: number;
}
