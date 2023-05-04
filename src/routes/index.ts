/**
 * Reunión y exportación de todas las rutas disponibles
 */
import express from 'express';
import { mutation, stats } from './mutation.routes';
// import { validarHeaders } from '../../funciones/validaciones/headers';
import { getMetrics } from "./metrics.routes";


const routes = express.Router();

routes.get('/stats', stats);
routes.post('/mutation', mutation);

/**
 * Rutas para Métricas
 */
routes.get('/metrics', getMetrics);


export {
    routes
}