import * as path from 'path';
import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      format: winston.format.json(),
      filename: path.join(process.cwd() + '/logs', 'info.log'),
      maxsize: 500
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli({ colors: { info: 'blue' } }),
        winston.format.printf(info => `${info.level}: ${info.message} ${info.durationMs ? 'execution time ' + info.durationMs + 'ms' : ''}`)
      )
    })
  ]
});
