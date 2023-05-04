import { IDna } from "../interfaces/Dna.interface";
import { Responses } from "../interfaces/Response.interface";
import { validateMutation } from "../operations/mutation.operation";
import { getStats } from "../operations/stats.operation";


const mutationController = async (data: IDna) : Promise<Responses> => {
    let result: Responses = { ok: true, error: null, msg: '', data: [] };
    let hasMutationValidate = await validateMutation(data)
    if (hasMutationValidate.ok) {
        result = { data: [], ok: true, msg: "Dna verified" }
    }else{
        result = { data: hasMutationValidate.data, ok: false, msg: "Dna faild verification" }
    }
    return result
}

const statsController = async () : Promise<Responses> => {
    let result: Responses = { ok: true, error: null, msg: '', data: [] };
    let fetchStats = await getStats()
    if (fetchStats.ok) {
        result = { data: fetchStats.data, ok: true, msg: "" }
    }else{
        result = { data: [], ok: false, msg: "Dna faild verification" }
    }
    return result
}

export {
    mutationController,
    statsController
}