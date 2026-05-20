import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'nest_api_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'], 
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
