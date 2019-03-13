/**
 * @component index.js
 * @description router 中间件
 * @time 2019-03-12 10:40
 * @author fishYu
**/

const router = require('koa-router')();

const home = require('./home');
const api = require('./api');
const page = require('./page');

router.use('/', home.routes(), home.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

module.exports = router;