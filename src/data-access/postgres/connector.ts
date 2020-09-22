import { Sequelize } from 'sequelize';
import config from '../../config';
import appEventEmitter from '../../events/app-event.emitter';

let sequelize: Sequelize;

if (!config.dbName || !config.dbUser || !config.dbPassword) {
  console.error('Please provide db config properties');
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
      console.log('sequelize: Connection has been established successfully.');
      appEventEmitter.emit('app-inited');
    })
    .catch(error =>
      console.error('Unable to connect to the database:', error));

  appEventEmitter.on('stop-app', () =>
    sequelize.close().then(() =>
        console.log('Connection has been closed successfully.'))
      .catch(error =>
        console.error('Unable to close to the connection:', error)));

}

export default sequelize;


