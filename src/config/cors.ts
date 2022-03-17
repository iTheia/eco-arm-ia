import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;
// esta es configuracion por si se llega a subir a internet y no tener problemos
export default registerAs(
  'cors',
  (): CorsOptions => ({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (env.ORIGIN.split(',').indexOf(origin) === -1) {
        return callback(new Error('not allowed'));
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);
