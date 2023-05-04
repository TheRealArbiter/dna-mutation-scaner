
import { logger } from "../../funciones/utilerias/logger";
import { Responses } from "../interfaces/Response.interface";
import { callApi } from "../services/apiCalls.service";
import { ApisEnum } from "../enums/apis.enum";

export const getStats = async () => {
    let result: Responses = { ok: false, error: null, msg: '', data: [] };
    logger.info(`BEGIN getStats`);
    let invokeService = await callApi(ApisEnum.STATS, "")
    if (invokeService?.ok) {
        logger.info(`END invokeService`, invokeService.data);
        result.data = invokeService?.data.data
        result.ok = true
    }else{ 
        result.data = invokeService?.data
        result.ok = false
    }
    return result;
}