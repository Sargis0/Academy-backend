import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeormConfig} from "./config/database/typeorm/typeorm.config";
import {UserOrmEntity} from "./infrastructure/database/postgre/user.orm-entity";
import {GroupOrmEntity} from "./infrastructure/database/postgre/group.orm-entity";
import {NewsOrmEntity} from "./infrastructure/database/postgre/news.orm-entity";
import {PermissionsOrmEntity} from "./infrastructure/database/postgre/permissions.orm-entity";
import {RolePermissionsOrmEntity} from "./infrastructure/database/postgre/role-permissions.orm-entity";
import {RoleOrmEntity} from "./infrastructure/database/postgre/role.orm-entity";
import {TokenOrmEntity} from "./infrastructure/database/postgre/token.orm.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserOrmEntity,
            GroupOrmEntity,
            NewsOrmEntity,
            PermissionsOrmEntity,
            RolePermissionsOrmEntity,
            RoleOrmEntity,
            TokenOrmEntity
        ]),
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: TypeormConfig.getConfig,
            inject: [ConfigService]
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
