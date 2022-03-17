import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import config from './config';
import { IaModule } from './modules/ia/ia.module';
import { CamaraModule } from './modules/camara/camara.module';
import { MathModule } from './modules/math/math.module';

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
    IaModule,
    CamaraModule,
    MathModule,
  ],
})
export class AppModule {}
