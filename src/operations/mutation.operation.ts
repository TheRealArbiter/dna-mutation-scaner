
import { logger } from "../../funciones/utilerias/logger";
import { Responses } from "../interfaces/Response.interface";
import { callApi } from "../services/apiCalls.service";
import { ApisEnum } from "../enums/apis.enum";

export const validateMutation = async (data: any) => {
    let result: Responses = { ok: false, error: null, msg: '', data: [] };
    logger.info(`BEGIN invokeService`);
    let invokeService = await callApi(ApisEnum.MUTATION, data)
    if (invokeService?.ok) {
        logger.info(`BEGIN invokeService`, invokeService.data);
        result.data = invokeService?.data
        result.ok = true
    }else{ 
        result.data = invokeService?.data
        result.ok = false
    }
    return result;
}