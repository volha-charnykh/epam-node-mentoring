import { Sequelize } from 'sequelize';
import config from '../../config';

let sequelize: Sequelize;

if (!config.dbPostgresName ||
  !config.dbPostgresUser ||
  !config.dbPostgresPassword) {
  console.error('Please provide db config properties');
  sequelize = new Sequelize();
} else {
  sequelize = new Sequelize(
    config.dbPostgresName,
    config.dbPostgresUser,
    config.dbPostgresPassword,
    {
      host: config.dbPostgresHost,
      port: config.dbPostgresPort ? +config.dbPostgresPort : undefined,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });
}

sequelize.authenticate()
  .then(() =>
    console.log('Connection has been established successfully.'))
  .catch(error =>
    console.error('Unable to connect to the database:', error));

const cleanup = () => sequelize.close() .then(() =>
    console.log('Connection has been closed successfully.'))
  .catch(error =>
    console.error('Unable to close to the connection:', error));

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

export default sequelize;


