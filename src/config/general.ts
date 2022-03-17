import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

//puerto donde corre la app
export default () => ({
  port: parseInt(env.PORT) || 3000,
});
