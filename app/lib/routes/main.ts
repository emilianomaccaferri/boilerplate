import express from 'express';

let router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {

    res.render('index', {
        title: 'Hello world',
        components: ['component'],
        bundles: ['home'] // specify bundles and components contained webpack.config.js like this
    })

})

export = router;