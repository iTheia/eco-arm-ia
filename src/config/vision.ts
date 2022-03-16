import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

export default registerAs('vision', () => ({
  credentials: JSON.parse(fs.readFileSync('certs/google.cert.json', 'utf-8')),
}));
