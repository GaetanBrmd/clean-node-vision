import { format, addColors, transports, createLogger } from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'magenta',
    debug: 'white',
};

const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

addColors(colors);

const consoleFormat = format.combine(
    format((info) => {
        info.level = info.level.toUpperCase();
        return info;
    })(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.colorize(),
    format.printf(
        (info) => `${info.timestamp} [${info.level}] : ${info.message}`
    )
);

const fileFormat = format.combine(
    format((info) => {
        info.level = info.level.toUpperCase();
        return info;
    })(),
    format.timestamp(),
    format.json()
);

const definedTransports = [
    new transports.Console({ format: consoleFormat }),
    new transports.File({ format: fileFormat, filename: 'logs/all.log' }),
    new transports.File({
        format: fileFormat,
        filename: 'logs/error.log',
        level: 'error',
    }),
];

const logger = createLogger({
    level: level(),
    levels: levels,
    transports: definedTransports,
});

export default logger;
