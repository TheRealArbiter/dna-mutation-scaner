import crypto from 'node:crypto'

export const encriptar = async (data) => {
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return hash;
};

export const comparar = async (cadenaEncriptada, cadena) => {
  let isEqual = false
  let encriptada = await encriptar(cadena);
  if (encriptada === cadenaEncriptada) {
    isEqual = true
  }
  return isEqual;
};