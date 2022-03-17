import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

// carga las credenciales de vision ai de google

export default registerAs('vision', () => ({
  credentials: JSON.parse(fs.readFileSync('certs/google.cert.json', 'utf-8')),
}));
