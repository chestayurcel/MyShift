const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Level log minimum yang akan dicatat
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'myshift-app' },
  transports: [
    //
    // - Tulis semua log dengan level `error` atau kurang ke `error.log`
    // - Tulis semua log dengan level `info` atau kurang ke `app.log`
    //
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

//
// Jika kita tidak berada di environment production,
// maka tampilkan juga log di console.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

module.exports = logger;