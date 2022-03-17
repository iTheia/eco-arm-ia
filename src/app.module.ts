import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import config from './config';
import { IaModule } from './modules/ia/ia.module';
import { CamaraModule } from './modules/camara/camara.module';
import { MathModule } from './modules/math/math.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticsModule } from './modules/statistics/statistics.module';

@Module({
  imports: [
    // carga todos los archivos de configuracion en src/config
    ConfigModule.forRoot({
      load: config,
      isGlobal: true,
    }),
    // para que si visitas la url de una imagen la retorne tipo
    // localhost:5000/images/01298312098309123.jpg
    ServeStaticModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('static'),
      inject: [ConfigService],
    }),
    // conexion a base de datos
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    IaModule,
    CamaraModule,
    MathModule,
    StatisticsModule,
  ],
})
export class AppModule {}
