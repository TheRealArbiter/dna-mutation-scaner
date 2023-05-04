import { NextFunction, Request, Response } from "express";
import { IEstandarResponse } from "../../src/interfaces/EstandarResponse.interface";
import { response } from "../../src/enums/response.enum";
import { validar_parametros } from "./esquema";
import { HeadersSchema } from "../../src/schemas/Headers.schema";
import { HTTP_CODIGOS } from "../../src/configs/codigos_http";

const validarHeaders = async (req: Request, res: Response, next: NextFunction) => {
    let estandarResponse: IEstandarResponse = JSON.parse(response.estandar_response);
    let validar : { body_json?:  {}, errors?: []};

    validar = await validar_parametros(req.headers, HeadersSchema);
    if (validar.errors) {
        estandarResponse.codigo = HTTP_CODIGOS._400.contexto._000.codigo;
        estandarResponse.errores = validar.errors;
        estandarResponse.mensaje = HTTP_CODIGOS._400.contexto._000.mensaje;
        res.status(HTTP_CODIGOS._400.estatus).json(estandarResponse);
        return;
    } else {
        next();
    }
}

export {
    validarHeaders
}