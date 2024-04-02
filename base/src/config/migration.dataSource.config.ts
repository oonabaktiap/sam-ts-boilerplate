import { DataSource } from 'typeorm';
import { Base } from '../entity/base.entity';


export const MyDataSource = new DataSource({
    type: 'postgres',
    host: 'local',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'postgres',


    synchronize: true,
    logging: false,
    // entities: [Base],
    // migrations: [],
    subscribers: [],
    entities: ['../entity/*.entity.ts'],
    migrations: ['../migration/*.ts'],
});

