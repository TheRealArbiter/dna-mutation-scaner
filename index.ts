// import { router, puerto } from "./src/index";
/**
 * Servidor de la API
 */
import express, { Express, Request, Response } from 'express';
import {routes} from './src/routes';
import path from 'path';
import { httpReqDurationMicroSec } from "./src/routes/metrics.routes";
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
declare global {
    var id_tracking : string
 }

const puerto = process.env.port || 8080;

const router: Express = express();
//@ts-ignore
router.use(express.urlencoded({ extended: false }));
//@ts-ignore
router.use(express.json());
//@ts-ignore
router.use(cors());
//@ts-ignore
router.use((req, res, next) => {
    global.id_tracking = uuidv4();
    next();
})

//@ts-ignore
router.use('/favicon.ico', express.static(path.join(__dirname, '../public/assets/images', 'favicon.ico')));
//@ts-ignore

router.use(`/demoapi/v1`, routes);

//@ts-ignore

router.use((req: Request, res: Response) => {
    const metric = httpReqDurationMicroSec.startTimer();
    const error: Error = new Error('Not Fount!');
    metric({ route: req.url, code: 404, method: req.method, origin: req.headers.origin })
    return res.status(404).json({ message: error.message });
});
//@ts-ignore

router.listen(puerto, () => console.log('API REST MUTATION: ' + puerto));

process.on('uncaughtException', (err: Error) => {
    console.log(`Excepción no controlada: \n ${err.name} ${err.message} ${err.stack}`);
})