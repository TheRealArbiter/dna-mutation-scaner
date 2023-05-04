/**
 * Mutation route
 */
import { Request, Response } from "express";
import { httpReqDurationMicroSec } from "./metrics.routes";
import { validar_parametros } from "../../funciones/validaciones/esquema";
import { logger } from "../../funciones/utilerias/logger";
import { HTTP_CODIGOS } from "../configs/codigos_http";
import { IEstandarResponse } from "../interfaces/EstandarResponse.interface";
import { response } from "../enums/response.enum";
import { mutationController, statsController } from "../controllers/mutation.controller";
import { IDna } from "../interfaces/Dna.interface";
import { MutationSchema } from "../schemas/MutationSchemas.schema";
/**
.
 * @param req parámetros de entrada.
 * @returns Logeo exitoso o no exitoso, dependiendo del caso.
 */

const mutation = async (req: Request, res: Response) => {
    let estandarResponse: IEstandarResponse = JSON.parse(response.estandar_response);
    let validar : { body_json?:  {}, errors?: []};
    try {
        const metric: Function = httpReqDurationMicroSec.startTimer();
        logger.info(`ROUTE mutation START REQUEST ${req.url}, METHOD: ${req.method}, request: ${JSON.stringify(req.body)}, ID: ${id_tracking}`);
        validar = await validar_parametros(req.body, MutationSchema);
        if (validar.errors) {
            estandarResponse.codigo = HTTP_CODIGOS._400.contexto._010.codigo;
            estandarResponse.errores = validar.errors;
            estandarResponse.mensaje = HTTP_CODIGOS._400.contexto._010.mensaje;
            res.status(HTTP_CODIGOS._400.estatus).json(estandarResponse);
            return;
        }
        let mutationRequest: IDna = { ...req.body };
        mutationController(mutationRequest).then(resp => {
            let stat: number = resp.ok ? 200 : 500;
            if (resp.ok) {
                estandarResponse.codigo = HTTP_CODIGOS._200.contexto._000.codigo;
                estandarResponse.mensaje = HTTP_CODIGOS._200.contexto._000.mensaje;
                estandarResponse.resultado = resp.data;
                res.status(HTTP_CODIGOS._200.estatus).json(estandarResponse);
            } else {
                if (resp.code === "004") {
                    estandarResponse.codigo = resp.code  === "004" ?  "004" : HTTP_CODIGOS._400.contexto._010.codigo;
                    estandarResponse.mensaje = HTTP_CODIGOS._400.contexto._010.mensaje;
                    estandarResponse.errores.push(resp.msg ?? "")
                    res.status(HTTP_CODIGOS._200.estatus).json(estandarResponse);
                    
                }else if(resp.code === "006") {
                    logger.info(`ROUTE mutation nip.routes: ${JSON.stringify(resp)}`);
                    estandarResponse.codigo =  resp.code  === "006" ?  "006" : HTTP_CODIGOS._400.contexto._010.codigo;;
                    estandarResponse.mensaje = HTTP_CODIGOS._400.contexto._010.mensaje;
                    estandarResponse.errores.push(resp.msg ?? "")
                    res.status(HTTP_CODIGOS._200.estatus).json(estandarResponse);
                }else if(resp.code === "007") {
                    logger.info(`ROUTE mutation nip.routes: ${JSON.stringify(resp)}`);
                    estandarResponse.codigo =  resp.code  === "007" ?  "007" : HTTP_CODIGOS._400.contexto._010.codigo;;
                    estandarResponse.mensaje = HTTP_CODIGOS._400.contexto._010.mensaje;
                    estandarResponse.errores.push(resp.msg ?? "")
                    res.status(HTTP_CODIGOS._200.estatus).json(estandarResponse);
                }else{
                    logger.info(`ROUTE mutation nip.routes: ${JSON.stringify(resp)}`);
                    estandarResponse.codigo = HTTP_CODIGOS._200.contexto._000.codigo;
                    estandarResponse.mensaje = HTTP_CODIGOS._200.contexto._000.mensaje;
                    estandarResponse.resultado = resp.data;
                    res.status(HTTP_CODIGOS._200.estatus).json(estandarResponse);
                }

            }
            metric({ route: req.url, code: stat, method: req.method, origin: req.headers.origin || '' });
            logger.info(`ROUTE mutation FINISH RESPONSE ${req.url}, METHOD: ${req.method}, request: ${JSON.stringify(req.body)}, ID: ${id_tracking}`);
        }, (err: Error) => {
            estandarResponse.codigo = HTTP_CODIGOS._500.contexto._101.codigo;
            estandarResponse.errores.push(err.message);
            estandarResponse.mensaje = HTTP_CODIGOS._500.contexto._101.mensaje;
            res.status(HTTP_CODIGOS._500.estatus).json(estandarResponse);
            metric({ route: req.url, code: 500, method: req.method, origin: req.headers.origin || '' });
            logger.error(`ROUTE mutation FINISH RESPONSE ${req.url}, METHOD: ${req.method}, request: ${JSON.stringify(req.body)}, ID: ${id_tracking}`);
        });
    } catch (err) {
        logger.error(`Error al consultar logear al cliente, nip.routes.ts: ${err}`);
        estandarResponse.codigo = HTTP_CODIGOS._500.contexto._101.codigo;
        estandarResponse.errores.push(`${err}`);
        estandarResponse.mensaje = HTTP_CODIGOS._500.contexto._101.mensaje;
        res.status(HTTP_CODIGOS._500.estatus).json(estandarResponse);
    }
}

const stats = async (req: Request, res: Response) => {
    let estandarResponse: IEstandarResponse = JSON.parse(response.estandar_response);
    let validar : { body_json?:  {}, errors?: []};
    try {
        const metric: Function = httpReqDurationMicroSec.startTimer();
        logger.info(`ROUTE stats START REQUEST ${req.url}, METHOD: ${req.method}, request: ${JSON.stringify(req.body)}, ID: ${id_tracking}`);
        statsController().then(resp => {
            let stat: number = resp.ok ? 200 : 500;
            if (resp.ok) {
                estandarResponse.codigo = HTTP_CODIGOS._200.contexto._000.codigo;
                estandarResponse.mensaje = HTTP_CODIGOS._200.contexto._000.mensaje;
                estandarResponse.resultado = resp.data;
                res.status(HTTP_CODIGOS._200.estatus).json(estandarResponse);
            } else {
                if (resp.code === "004") {
                    estandarResponse.codigo = resp.code  === "004" ?  "004" : HTTP_CODIGOS._400.contexto._010.codigo;
                    estandarResponse.mensaje = HTTP_CODIGOS._400.contexto._010.mensaje;
                    estandarResponse.errores.push(resp.msg ?? "")
                    res.status(HTTP_CODIGOS._200.estatus).json(estandarResponse);
                    
                }else if(resp.code === "006") {
                    logger.info(`ROUTE stats nip.routes: ${JSON.stringify(resp)}`);
                    estandarResponse.codigo =  resp.code  === "006" ?  "006" : HTTP_CODIGOS._400.contexto._010.codigo;;
                    estandarResponse.mensaje = HTTP_CODIGOS._400.contexto._010.mensaje;
                    estandarResponse.errores.push(resp.msg ?? "")
                    res.status(HTTP_CODIGOS._200.estatus).json(estandarResponse);
                }else if(resp.code === "007") {
                    logger.info(`ROUTE stats nip.routes: ${JSON.stringify(resp)}`);
                    estandarResponse.codigo =  resp.code  === "007" ?  "007" : HTTP_CODIGOS._400.contexto._010.codigo;;
                    estandarResponse.mensaje = HTTP_CODIGOS._400.contexto._010.mensaje;
                    estandarResponse.errores.push(resp.msg ?? "")
                    res.status(HTTP_CODIGOS._200.estatus).json(estandarResponse);
                }else{
                    logger.info(`ROUTE stats nip.routes: ${JSON.stringify(resp)}`);
                    estandarResponse.codigo = HTTP_CODIGOS._200.contexto._000.codigo;
                    estandarResponse.mensaje = HTTP_CODIGOS._200.contexto._000.mensaje;
                    estandarResponse.resultado = resp.data;
                    res.status(HTTP_CODIGOS._200.estatus).json(estandarResponse);
                }

            }
            metric({ route: req.url, code: stat, method: req.method, origin: req.headers.origin || '' });
            logger.info(`ROUTE stats FINISH RESPONSE ${req.url}, METHOD: ${req.method}, request: ${JSON.stringify(req.body)}, ID: ${id_tracking}`);
        }, (err: Error) => {
            estandarResponse.codigo = HTTP_CODIGOS._500.contexto._101.codigo;
            estandarResponse.errores.push(err.message);
            estandarResponse.mensaje = HTTP_CODIGOS._500.contexto._101.mensaje;
            res.status(HTTP_CODIGOS._500.estatus).json(estandarResponse);
            metric({ route: req.url, code: 500, method: req.method, origin: req.headers.origin || '' });
            logger.error(`ROUTE stats FINISH RESPONSE ${req.url}, METHOD: ${req.method}, request: ${JSON.stringify(req.body)}, ID: ${id_tracking}`);
        });
    } catch (err) {
        logger.error(`Error al consultar logear al cliente, nip.routes.ts: ${err}`);
        estandarResponse.codigo = HTTP_CODIGOS._500.contexto._101.codigo;
        estandarResponse.errores.push(`${err}`);
        estandarResponse.mensaje = HTTP_CODIGOS._500.contexto._101.mensaje;
        res.status(HTTP_CODIGOS._500.estatus).json(estandarResponse);
    }
}



export {
    mutation, 
    stats
}