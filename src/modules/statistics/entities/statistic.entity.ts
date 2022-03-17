import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Statistic {
  @Prop({})
  data: string;
}

export type StatisticDocument = Statistic & Document;
export const StatisticSchema = SchemaFactory.createForClass(Statistic);
