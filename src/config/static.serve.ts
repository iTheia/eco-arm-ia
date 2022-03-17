import { registerAs } from '@nestjs/config';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';

// donde guarda los archivos estaticos como imagenes
export default registerAs('static', (): ServeStaticModuleOptions[] => [
  {
    rootPath: join(__dirname, '..', '..', 'static'),
    exclude: ['/'],
  },
]);
