import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { UserOrmEntity } from "../user.orm-entity";
import { RoleOrmEntity } from "../role.orm-entity";
import { PermissionsOrmEntity } from '../permissions.orm-entity';
import { RolePermissionsOrmEntity } from '../role-permissions.orm-entity';

config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [
        UserOrmEntity,
        RoleOrmEntity,
        PermissionsOrmEntity,
        RolePermissionsOrmEntity,
    ],
    synchronize: false,
    logging: false,
});
