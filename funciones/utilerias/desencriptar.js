import fs from 'fs'
import NodeRSA from 'node-rsa'

const desencriptar =  (dato) => {
    let key = new NodeRSA();
    let privada = fs.readFileSync('certs/private.pem');
    key.importKey(privada);
    let desencriptado = key.decrypt(dato, 'utf8');

    return desencriptado;
}
export default desencriptar