import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Statistic, StatisticDocument } from './entities';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Statistic.name) private statistic: Model<StatisticDocument>,
  ) {}
}
