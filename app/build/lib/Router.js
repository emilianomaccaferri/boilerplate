"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _app, _whitelist;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const helmet = require('helmet');
const cors = require('cors');
const cookiep = require('cookie-parser');
const body = require("body-parser");
const HTTPError_1 = __importDefault(require("./HTTPError"));
class Router {
    constructor() {
        _app.set(this, void 0);
        _whitelist.set(this, void 0);
        __classPrivateFieldSet(this, _app, express_1.default());
        __classPrivateFieldSet(this, _whitelist, ['*']);
    }
    init() {
        let cors_options = {
            credentials: true,
            origin: __classPrivateFieldGet(this, _whitelist),
            allowedHeaders: ['Authorization'],
            methods: ['GET', 'POST', 'DELETE', 'PUT']
        };
        // this.#app.use(helmet()); // configure helmet before going to prod
        __classPrivateFieldGet(this, _app).use(cors(cors_options));
        __classPrivateFieldGet(this, _app).enable("trust proxy");
        __classPrivateFieldGet(this, _app).disable("x-powered-by");
        __classPrivateFieldGet(this, _app).set("view engine", "twig");
        __classPrivateFieldGet(this, _app).set("views", path_1.default.resolve("app/views"));
        __classPrivateFieldGet(this, _app).use(cookiep());
        __classPrivateFieldGet(this, _app).use(body.json({ limit: "20mb" }));
        __classPrivateFieldGet(this, _app).use(body.urlencoded({ limit: "20mb", extended: true, parameterLimit: 100 }));
        __classPrivateFieldGet(this, _app).use('/assets', express_1.default.static(path_1.default.resolve('app/assets')));
        __classPrivateFieldGet(this, _app).use('/', require("./routes/main"));
        __classPrivateFieldGet(this, _app).all('*', (req, res) => {
            return HTTPError_1.default.NOT_FOUND.toResponse(res);
        });
        __classPrivateFieldGet(this, _app).listen(process.env.PORT);
        console.log(`listening on ${process.env.PORT}`);
        console.log(`live on ${process.env.URI}`);
    }
}
exports.default = Router;
_app = new WeakMap(), _whitelist = new WeakMap();
