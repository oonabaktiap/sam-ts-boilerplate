import { DataSource } from 'typeorm';
import { Base } from '../entity/base.entity';
//docker run --name postgres-container -p 5432:2345 -e POSTGRES_PASSWORD=password123 -e POSTGRES_USER=admin -d postgres
export const MyDataSource = new DataSource({
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Base],
  migrations: [],
  subscribers: [],
  // entities: ['../entity/*.entity.ts'],
  // migrations: ['../migration/*.ts'],
});

MyDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
