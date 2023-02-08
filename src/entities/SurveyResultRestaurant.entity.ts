import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DeliveryRestaurant } from './DeliveryRestaurant.entity';
import { SurveyResult } from './SurveyResult.entity';

@Index('survey_result_restaurant_pkey', ['surveyResultRestaurantId'], {
  unique: true,
})
@Entity('survey_result_restaurant', { schema: 'public' })
export class SurveyResultRestaurant {
  @Column('integer', { name: 'feedback', nullable: true })
  feedback: number | null;

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'survey_result_restaurant_id',
  })
  surveyResultRestaurantId: number;

  @ManyToOne(
    () => DeliveryRestaurant,
    (deliveryRestaurant) => deliveryRestaurant.surveyResultRestaurants,
  )
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'restaurantId' }])
  restaurant: DeliveryRestaurant;

  @ManyToOne(() => SurveyResult, (surveyResult) => surveyResult.surveyResultRestaurants)
  @JoinColumn([{ name: 'result_id', referencedColumnName: 'resultId' }])
  result: SurveyResult;
}
