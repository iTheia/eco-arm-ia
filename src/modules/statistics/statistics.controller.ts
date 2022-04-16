import { Controller, Get, Render } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  @Get()
  @Render('index')
  root() {
    return { test: [{ message: 'Hello world!' }] };
  }
}
