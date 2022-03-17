import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default registerAs('database', () => ({
  uri: process.env.DB_URL || 'mongodb://localhost/eco-arm-ia',
}));
