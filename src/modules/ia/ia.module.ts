import { Module } from '@nestjs/common';
import { IaService } from './ia.service';
import { IaController } from './ia.controller';
import { MathModule } from '@modules/math/math.module';
import { CamaraModule } from '@modules/camara/camara.module';

@Module({
  imports: [MathModule, CamaraModule],
  controllers: [IaController],
  providers: [IaService],
})
export class IaModule {}
