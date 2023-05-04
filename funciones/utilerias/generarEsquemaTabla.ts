import { ISegurosAmortizacion } from '../../src/interfaces/SegurosAmoritzacion.interface';
import { Int, Bit, NVarChar } from 'mssql';

export function generateSchema(data: ISegurosAmortizacion): any[] {
    return Object.entries(data.seguros[0]).map((key, value): any => {
      let dataType: typeof Int | typeof Bit | typeof NVarChar = NVarChar;
      for (const row of data.seguros) {
        const seguro = key[1];
        if (seguro !== null && seguro !== undefined) {
          if (typeof seguro === 'number') {
            dataType = Int;
            break;
          } else if (typeof seguro === 'boolean') {
            dataType = Bit;
            break;
          } else if (typeof seguro === 'string') {
            dataType = NVarChar;
            break;
          }
        }
      }
      return {
        name: key[0],
        sqlType: dataType
      };
    });
}
  
  
  
  
