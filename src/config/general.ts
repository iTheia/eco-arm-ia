import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export default () => ({
  port: parseInt(env.PORT),
});
