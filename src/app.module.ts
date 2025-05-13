import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeormConfig} from "./config/database/typeorm/typeorm.config";

@Module({
    imports: [
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
