import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';
import config from './config.js';

// Ensure log directory exists
const logDir = path.resolve(config.logDir);
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

/**
 * Custom log format for console output (colorized, human-readable)
 */
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
        return `[${timestamp}] ${level}: ${message}${metaStr}`;
    })
);

/**
 * JSON format for file output (machine-parseable)
 */
const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

/**
 * Daily rotating file transport for all logs
 */
const dailyRotateTransport = new DailyRotateFile({
    filename: path.join(logDir, 'scraper-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
    format: fileFormat,
});

/**
 * Error-only log file
 */
const errorTransport = new winston.transports.File({
    filename: path.join(logDir, 'error.log'),
    level: 'error',
    format: fileFormat,
});

/**
 * Combined log file
 */
const combinedTransport = new winston.transports.File({
    filename: path.join(logDir, 'combined.log'),
    format: fileFormat,
});

/**
 * Console transport (colorized output)
 */
const consoleTransport = new winston.transports.Console({
    format: consoleFormat,
});

/**
 * Main application logger
 */
export const logger = winston.createLogger({
    level: config.logLevel,
    defaultMeta: { service: 'job-scraper' },
    transports: [
        consoleTransport,
        dailyRotateTransport,
        errorTransport,
        combinedTransport,
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: path.join(logDir, 'exceptions.log') }),
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: path.join(logDir, 'rejections.log') }),
    ],
});

/**
 * Create a child logger with additional context
 */
export function createLogger(context: Record<string, string>): winston.Logger {
    return logger.child(context);
}

export default logger;
