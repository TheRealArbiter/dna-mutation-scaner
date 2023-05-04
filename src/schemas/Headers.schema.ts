import { JSONSchemaType } from "ajv";
import { IHeaders } from "../interfaces/Headers.interface";

export const HeadersSchema : JSONSchemaType<IHeaders> = {
    type: "object",
    properties: {
        nombre_aplicativo: { type: "string", nullable: false, pattern: "^(?![nN][uU][lL]{2}$)\\s*\\S.*" },
        identificador_usuario: { type: "string", nullable: false, pattern: "^(?![nN][uU][lL]{2}$)\\s*\\S.*" }
      },
    required: [
        "nombre_aplicativo",
        "identificador_usuario"
    ],
    errorMessage : {
        type: "El dato de entrada debe ser un objeto",
        properties: {
            nombre_aplicativo: "El campo 'nombre_aplicativo' debe ser de tipo cadena o string",
            identificador_usuario: "El campo 'identificador_usuario' debe ser de tipo cadena o string"
        },
        required: {
            nombre_aplicativo: "instance requires property 'nombre_aplicativo'",
            identificador_usuario: "instance requires property 'identificador_usuario'"
        }
    }
}