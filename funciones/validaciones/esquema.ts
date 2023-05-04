import Ajv from 'ajv'
import AjvErrors  from 'ajv-errors'
let ajv = new Ajv({
    allErrors: true,
    messages:true
 })
let ajvErrors = AjvErrors(ajv)

 const  validar_parametros = async (body_json: object, schema: object ) =>{
    let detalles : Array<string> = []
    const validate = ajv.validate(schema, body_json)
    if (!validate) {
        ajvErrors.errors?.forEach(function(error:any) {
            detalles.push(`${error.instancePath ? error.instancePath + ": " : ""}${error.message}`);
        });
    }
    return validate ? body_json : {
        errors: detalles
    };

}

export { validar_parametros }