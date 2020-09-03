import * as dotenv from 'dotenv';
dotenv.config();

export default {
  port: +process.env.PORT,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: +process.env.DB_PORT,
  connectionPoolMax: +process.env.DB_POOL_MAX,
  connectionPoolMin: +process.env.DB_POOL_MIN,
  connectionPoolAcquire: +process.env.DB_POOL_ACQUIRE,
  connectionPoolIdle: +process.env.DB_POOL_IDLE
};
