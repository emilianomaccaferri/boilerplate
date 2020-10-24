import express from 'express';
import path from 'path'
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
        this.#whitelist = ['*']

    }

    init(): void{

        let cors_options = {
            credentials: true,
            origin: this.#whitelist,
            allowedHeaders: ['Authorization'],
            methods: ['GET', 'POST', 'DELETE', 'PUT']
        }

        // this.#app.use(helmet()); // configure helmet before going to prod
        this.#app.use(cors(cors_options));
        this.#app.enable("trust proxy");
        this.#app.disable("x-powered-by");
        this.#app.set("view engine", "twig");
        this.#app.set("views", path.resolve("app/views"))
        this.#app.use(cookiep());
        this.#app.use(body.json({ limit: "20mb" }));
        this.#app.use(
            body.urlencoded({ limit: "20mb", extended: true, parameterLimit: 100 }),
        );

        this.#app.use('/assets', express.static(path.resolve('app/assets')));
        this.#app.use('/', require("./routes/main")); 

        this.#app.all('*', (req: express.Request, res: express.Response) => {

            return HTTPError.NOT_FOUND.toResponse(res);
            
        })

        this.#app.listen(process.env.PORT);
        console.log(`listening on ${process.env.PORT}`);
        console.log(`live on ${process.env.URI}`);
    }

}