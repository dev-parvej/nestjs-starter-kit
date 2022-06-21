import { LogLevel } from '@nestjs/common/services/logger.service';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { getCurrentUTCDate } from '../helper/date.helper';

export function getLogLevels(isProduction: boolean): LogLevel[] {
  if (isProduction) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
}

export const fileWinstonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.simple(),
);

export const consoleWinstonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.ms(),
  nestWinstonModuleUtilities.format.nestLike('EXAM-APP', {
    prettyPrint: true,
  }),
);

export const loggerOptions = {
  transports: [
    new winston.transports.Console({
      format: consoleWinstonFormat,
    }),
    new winston.transports.File({
      filename: `${getCurrentUTCDate()}-error.log`,
      dirname: process.env.ERROR_LOG_DIRNAME || 'logs/error',
      level: process.env.ERROR_LOG_LEVEL || 'error',
      format: fileWinstonFormat,
    }),
    new winston.transports.File({
      filename: `${getCurrentUTCDate()}-combined.log`,
      dirname: process.env.COMBINED_LOG_DIRNAME || 'logs/combined',
      level: process.env.COMBINED_LOG_LEVEL || 'info',
      format: fileWinstonFormat,
    }),
  ],
};
