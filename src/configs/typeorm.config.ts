import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'dpg-cf6ed4ha6gdjkk49fcbg-a.oregon-postgres.render.com',
  port: 5432,
  username: 'meomullae_poo6_user',
  password: 'odNk3dPLLv9QvzbTORCPchFI21aF99Ke',
  database: 'meomullae_poo6',
  entities: [__dirname + '/../entities/*.*'],
  synchronize: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
