import { registerAs } from '@nestjs/config';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';

export default registerAs('static', (): ServeStaticModuleOptions[] => [
  {
    rootPath: join(__dirname, '..', '..', 'static'),
  },
]);
