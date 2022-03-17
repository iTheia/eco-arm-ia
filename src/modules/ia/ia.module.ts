import { Module } from '@nestjs/common';
import { IaService } from './ia.service';
import { IaController } from './ia.controller';
import { MathModule } from '@modules/math/math.module';

@Module({
  imports: [MathModule],
  controllers: [IaController],
  providers: [IaService],
})
export class IaModule {}
