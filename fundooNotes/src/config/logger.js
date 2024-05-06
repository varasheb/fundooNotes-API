import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

/**
 * Logger handles all logs in the application
 */
const logger = winston.createLogger({
  format: format.combine(format.timestamp(), format.simple()),
  colorize: true,
  
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      handleExceptions: true
    }),
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
      handleExceptions: true
    }),
    new winston.transports.DailyRotateFile({
      maxFiles: '7d',
      level: 'info',
      dirname: 'logs/daily',
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%.log'
    }),
    new winston.transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.cli(),
        format.printf((info)=>`[${info.timestamp}]  ${info.level}: ${info.message}`)
      ),
      handleExceptions: true
    })
  ]
});

const morganLogger = winston.createLogger({
  format: format.combine(format.simple()),
  transports: [
    new winston.transports.File({
      filename: 'logs/requests/all.log',
      level: 'debug',
      handleExceptions: true
    }),
    new winston.transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.cli(),
        format.printf((info)=>`${info.level}: ${info.message}`)
      ),
      handleExceptions: true
    }),
  ]
});

export const logStream = {
  write(message) {
    morganLogger.info(message.toString());
  }
};


export default logger;