import fs from 'fs';
import axios from 'axios';
import { ApisEnum } from '../enums/apis.enum';
import { IAxiosRequest } from '../interfaces/AxiosRequest.interface';
import { logger } from '../../funciones/utilerias/logger';
import { Responses } from '../interfaces/Response.interface';

const callApi = async function(api: string, data: any) {
    let file_apis = JSON.parse(fs.readFileSync("src/configs/apis.json", "utf-8"));
    let axiosConfig: IAxiosRequest = { method: "", url: "", headers: {}, data: ""};
    let requestInfo;
    switch (api){
        case ApisEnum.MUTATION:
            requestInfo = file_apis.mutation;
            axiosConfig.url = process.env.MUTATION || requestInfo.complemento.MUTATION;
            break;
        case ApisEnum.STATS:
            requestInfo = file_apis.stats;
            axiosConfig.url = process.env.STATS || requestInfo.complemento.STATS;
            break;
        default:
            logger.error(`Error: El api ${api} no existe`);
            return null;

    }
    axiosConfig.method = requestInfo.method;
    axiosConfig.headers = requestInfo.headers;
    axiosConfig.data = data;
    logger.info(`CALL MS URL ${api}: ${axiosConfig.url}`);
    return consumirServicio(axiosConfig);
};

async function consumirServicio(axiosConfig: IAxiosRequest) : Promise<Responses> {
    let result : Responses = { ok: false, msg: '', data: []}
    logger.info(`REQUEST CONFIG: ${JSON.stringify(axiosConfig)}`);
    return axios(axiosConfig).then(res => {
        logger.info(`RESPONSE LAMBDA CALL ${res}`)
        result = { ok: true, data: res, msg: ''}
        return result;
    }).catch(error => {
        if (error.code != 'ECONNREFUSED') {
            logger.error(`ERROR CALLING MS Response: ${JSON.stringify(error.response.data)}`);
            console.log("AXIOS ERROR RESPONSE", JSON.stringify(error));
            result = { ok: false, error: error.response.data, msg: error}
            return error.response;
        } else {
            result = { ok: false, error: error, msg: error}
            logger.error(`ERROR CALLING MS, COULD NOT CONNECT ${error.code}`);
            return { noConecction:true };
        }
    });
};

export { callApi }