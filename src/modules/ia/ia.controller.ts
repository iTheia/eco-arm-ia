import { CamaraService } from '@modules/camara/camara.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { IaService } from './ia.service';

@Controller('ia')
export class IaController {
  private serviceOn: boolean = true;
  constructor(
    private readonly iaService: IaService,
    private camaraService: CamaraService,
  ) {}

  @Post('onAndOff')
  async onAndOff(@Body() dto: { state: boolean }) {
    this.serviceOn = dto.state;
    return { success: true };
  }

  @Get('onAndOff')
  @Render('onAndOff')
  async onAndOffPage() {}

  @Get('detect')
  async detect() {
    if (!this.serviceOn) {
      throw new HttpException('IA service not avaiable', 500);
    }
    return this.iaService.detect(await this.camaraService.takePhoto());
  }

  @Get('detect/test-arm')
  async detectTest(@Query('x') x: number, @Query('y') y: number) {
    if (!this.serviceOn) {
      throw new HttpException('IA service not avaiable', 500);
    }
    return this.iaService.detectTest({ x, y });
  }
  @Get('detect/:name')
  async detectByName(@Param('name') name: string) {
    if (!this.serviceOn) {
      throw new HttpException('IA service not avaiable', 500);
    }
    return this.iaService.detect(name);
  }
}
