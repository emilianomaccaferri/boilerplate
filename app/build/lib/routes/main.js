"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello world',
        components: ['component'],
        bundles: ['home'] // specify bundles and components contained webpack.config.js like this
    });
});
module.exports = router;
