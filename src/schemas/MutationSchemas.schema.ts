import { JSONSchemaType } from "ajv";
import { IDna } from "../interfaces/Dna.interface";

export const MutationSchema : JSONSchemaType<IDna> = {
    type: "object",
    properties: {
        sequences: {
            uniqueItems: true,
            type: "array",
            items: {
                type: 'string',
            },
            nullable: false
        },
      },
    required: [
        "sequences",
    ],
    errorMessage : {
        type: "El dato de entrada debe ser un objeto",
        properties: {
            sequences: "El campo 'sequence' debe ser tipo cadena",
        },
        required: {
            sequences: "El campo 'sequences' es requerido",
        }
    }
}