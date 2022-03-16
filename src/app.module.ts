import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import config from './config';
import { IaModule } from './modules/ia/ia.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      isGlobal: true,
    }),
    ServeStaticModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('static'),
      inject: [ConfigService],
    }),
    IaModule,
  ],
})
export class AppModule {}
