import fs from 'fs'
import NodeRSA from 'node-rsa'

export const descifrar = async(dato) => {
    try {
        let key = new NodeRSA();
        let privateKey = fs.readFileSync('certs/private_key_CajeroDev.pem')
        key.importKey(privateKey);
        let desencriptado = key.decrypt(dato, 'utf8');
        if (desencriptado) {
            return desencriptado;
        }
        
        return desencriptado;


    } catch (error) {
        throw(error)
    }
}