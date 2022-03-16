import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('social media')
  .setDescription('')
  .setVersion('1.0')
  .build();
