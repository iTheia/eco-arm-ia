import { Controller, Get, Param } from '@nestjs/common';
import { IaService } from './ia.service';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Get('detect/:name')
  async detect(@Param('name') name: string) {
    return this.iaService.detect(name);
  }
}
