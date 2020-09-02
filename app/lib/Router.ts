import express from 'express';
const helmet = require('helmet');
const cors = require('cors');
const cookiep = require('cookie-parser');
const body = require("body-parser");
import HTTPError from './HTTPError'

export default class Router{

    #app: express.Application;
    #whitelist: string[];
    constructor(){
        
        this.#app = express();
        this.#whitelist = ['*'] // whitelist di domini per il CORS

    }

    init(): void{

        // facciamo un file separato per ogni gruppo di routes
        // così è tutto molto più organizzato

        let cors_options = {
            credentials: true,
            origin: this.#whitelist,
            allowedHeaders: ['Authorization'],
            methods: ['GET', 'POST', 'DELETE', 'PUT']
        }

        this.#app.use(helmet());
        this.#app.use(cors(cors_options));
        this.#app.enable("trust proxy");
        this.#app.disable("x-powered-by");
        this.#app.use(cookiep());
        this.#app.use(body.json({ limit: "20mb" }));
        this.#app.use(
            body.urlencoded({ limit: "20mb", extended: true, parameterLimit: 100 }),
        );

        this.#app.use('/assets', express.static('./assets'));
        this.#app.use('/', require("./routes/main")); 

        this.#app.all('*', (req: express.Request, res: express.Response) => {

            return HTTPError.NOT_FOUND.toResponse(res);
            
        })

        this.#app.listen(process.env.PORT);
        console.log(`listening on ${process.env.PORT}`);
        console.log(`live on ${process.env.URI}`);
    }

}