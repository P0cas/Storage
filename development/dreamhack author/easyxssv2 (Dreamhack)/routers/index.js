const express = require('express');
const bot = require('./bot');
const router = express();

const remove_whitespace = (url) => {
    const whitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    url = url.replace(whitespace, '')
    return url
}

const normalization = (url) => {
    url = remove_whitespace(url.replace('\\', ''));
    return url.replace(/\/{3,}/, '//');
}

router.get('/', (req, res) => {
    res.send('Hello there.');
});

/*
router.get('/plugin-visa')
router.get('/plugin-car-license')
router.get('/plugin-passport')
router.get('/plugin-pcr')
router.get('/plugin-cryptocurrency')
router.get('/plugin-memo')

2022-05-15 ~ 2030-05-16 dev-ing : plan

*/

router.get('/plugin-calc', (req, res) => {
    res.render('calc.html');
});

router.get('/sandbox', (req, res) => {
    res.render('sandbox.html');
});

router.post('/report', async (req, res) => {
    const { url } = req.body
    const protocol_re = /^http\:|https\:|\//i;

    try{
        if (protocol_re.exec(url)){
            bot(normalization(req.body.url));
            res.json({'state':'Good Report!'});
        } else {
            res.json({'state':'Disallowed protocol!'});
        }
    } catch (err) {
        res.status(500);res.json({'state':'Internal Server Error!'});
    }
});

module.exports = router;