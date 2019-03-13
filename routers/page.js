/**
 * @component page.js
 * @description router 中间件
 * @time 2019-03-12 10:40
 * @author fishYu
**/

const router = require('koa-router')();


module.exports = router.get('/404', async (ctx) => {
  ctx.body = '404 page!'
}).get('/helloworld', async (ctx) => {
  ctx.body = 'helloworld page!'
});