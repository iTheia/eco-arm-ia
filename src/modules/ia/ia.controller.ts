import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { IaService } from './ia.service';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Get()
  async detect(@Res() res: Response) {
    return this.iaService.detect(res);
  }
}
