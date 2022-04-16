import { Module } from '@nestjs/common';
import { Arm } from './arm';
import { MathService } from './math.service';

@Module({
  providers: [
    MathService,
    {
      provide: 'ARM',
      useFactory: () => new Arm(),
    },
  ],
  exports: [MathService],
})
export class MathModule {}
