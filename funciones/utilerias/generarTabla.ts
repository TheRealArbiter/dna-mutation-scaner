import sql from 'mssql';
import { ISegurosAmortizacion } from '../../src/interfaces/SegurosAmoritzacion.interface';
import { generateSchema } from './generarEsquemaTabla';

export function generateTVP(data: ISegurosAmortizacion): sql.Table {
    const schema = generateSchema(data);
    const table = new sql.Table();
    schema.forEach(column => table.columns.add(column.name, column.sqlType));
    data.seguros.forEach(row => table.rows.add(...Object.values(row)));
    return table;
  }