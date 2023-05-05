/**
 * Configuraciones Generales y variables de entorno
 */
import desencriptar from '../../funciones/utilerias/desencriptar'
import  conexion from './conexion.json';
const environment_config = conexion['conexion']

/**
 * DB Config
 */
export const SQLDB_CONFIG = {
    SQL_SERVER: process.env.ENV_SERVER || environment_config.database_config.server,
    SQL_USER: desencriptar(process.env.ENV_USER || environment_config.database_config.user),
    SQL_PASS: desencriptar(process.env.ENV_PASS || environment_config.database_config.password),
    SQL_DB: desencriptar(process.env.ENV_BASE || environment_config.database_config.database),
}
