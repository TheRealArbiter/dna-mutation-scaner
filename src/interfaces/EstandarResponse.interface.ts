export interface IEstandarResponse {
    codigo: string,
    errores: Array<string>,
    mensaje: string | undefined,
    resultado: {} | [] | undefined
}