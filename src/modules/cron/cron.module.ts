import { CamaraModule } from '@modules/camara/camara.module';
import { IaModule } from '@modules/ia/ia.module';
import { MathModule } from '@modules/math/math.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot(), MathModule, CamaraModule, IaModule],
  providers: [CronService],
})
export class CronModule {}
