import { Sequelize } from 'sequelize';
import config from '../../config';
import appEventEmitter from '../../events/app-event.emitter';
import { logger } from '../../logger';

let sequelize: Sequelize;

if (!config.dbName || !config.dbUser || !config.dbPassword) {
  logger.error('sequelize: Please provide db config properties');
} else {
  sequelize = new Sequelize(
    config.dbName,
    config.dbUser,
    config.dbPassword,
    {
      host: config.dbHost,
      port: config.dbPort,
      dialect: 'postgres',
      pool: {
        max: config.connectionPoolMax,
        min: config.connectionPoolMin,
        acquire: config.connectionPoolAcquire,
        idle: config.connectionPoolIdle
      },
      define: {
        timestamps: false
      }
    });

  sequelize.authenticate()
    .then(() => {
      logger.info('sequelize: Connection has been established successfully.');
      appEventEmitter.emit('app-inited');
    })
    .catch(error =>
      logger.error(`sequelize: Unable to connect to the database: ${error}`));

  appEventEmitter.on('stop-app', () =>
    sequelize.close().then(() => {
        logger.info('sequelize: Connection has been closed successfully.');
        appEventEmitter.emit('app-stopped');
      })
      .catch(error =>
        logger.error(`sequelize: Unable to close to the connection: ${error}`)));

}

export default sequelize;


