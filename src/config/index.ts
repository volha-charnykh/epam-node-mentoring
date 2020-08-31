import * as dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  dbPostgresName: process.env.DB_POSTGRES_DB_NAME,
  dbPostgresUser: process.env.DB_POSTGRES_USER,
  dbPostgresPassword: process.env.DB_POSTGRES_PASSWORD,
  dbPostgresHost: process.env.DB_POSTGRES_HOST,
  dbPostgresPort:  process.env.DB_POSTGRES_PORT
};
