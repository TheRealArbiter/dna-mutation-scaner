import  *  as  winston  from  'winston';
import  DailyRotateFile from 'winston-daily-rotate-file';
import moment from 'moment-timezone'
import * as  packageJson from"../../package.json"

const { splat, combine, timestamp, printf } = winston.format;

/**
 * Función para generar el archivo diario de los logs de la API
 * @function myFormat establece un formato basado en la zona horaria y un id_tracking único por cada petición
 * @const transports parámetro que contiene las directrices que indican el origen de la información y la creación de un archivo diario
 * @function logger función con las configuraciones para generar el log diario y se exporta para ser llamada en otros módulos
 * @function stream función con que genera el documento diario con sus configuraciones.
 * @function write función que escribe el documento diario con sus logs.
 */

let myFormat = printf(({ level, message, meta }) => {
  let id_tracking = global.id_tracking;
  let fecha = moment().tz("America/Mexico_City");
  return `${fecha.format("YYYY-MM-DD HH:mm:ss")}|${level}|${id_tracking}|${message}${meta ? JSON.stringify(meta) : ""}`;
});

const transports = {
  console: new winston.transports.Console({
    level: "info",
    handleExceptions: true,
    colorize: true,
  }),

  file: DailyRotateFile = new DailyRotateFile({
    filename: "./logs/" + packageJson.name + "/%DATE%" + "_" + packageJson.name + ".log",
    datePattern: "YYYY-MM-DD",
    level: "debug",
    zippedArchive: true,
    maxSize: "20m",
  }),
};

const logger = winston.createLogger({
  format: combine(timestamp(), splat(), myFormat),
  transports: [transports.console, transports.file],
});

logger.stream = {
  write: function (message) {
    logger.info(message);
  },
};

export {
  logger
}