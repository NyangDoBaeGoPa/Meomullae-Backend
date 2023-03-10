import { Column, Entity, Index, OneToMany } from 'typeorm';

import { SurveyResultRestaurant } from './SurveyResultRestaurant.entity';

@Index('delivery_restaurant_pkey', ['restaurantId'], { unique: true })
@Entity('delivery_restaurant', { schema: 'public' })
export class DeliveryRestaurant {
  @Column('integer', { primary: true, name: 'restaurant_id' })
  restaurantId: number;

  @Column('character varying', { name: 'restaurant_name' })
  restaurantName: string;

  @Column('character varying', { name: 'restaurant_location' })
  restaurantLocation: string;

  @Column('character varying', { name: 'restaurant_image' })
  restaurantImage: string;

  @Column('integer', { name: 'food_price' })
  foodPrice: number;

  @OneToMany(
    () => SurveyResultRestaurant,
    (surveyResultRestaurant) => surveyResultRestaurant.restaurant,
  )
  surveyResultRestaurants: SurveyResultRestaurant[];
}
