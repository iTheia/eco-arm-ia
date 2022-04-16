import { Controller, Get, Param, Query } from '@nestjs/common';
import { IaService } from './ia.service';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Get('detect/test-arm')
  async detectTest(@Query('x') x: number, @Query('y') y: number) {
    return this.iaService.detectTest({ x, y });
  }
  @Get('detect/:name')
  async detect(@Param('name') name: string) {
    return this.iaService.detect(name);
  }
}
