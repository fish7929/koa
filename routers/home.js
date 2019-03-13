/**
 * @component home.js
 * @description router 中间件
 * @time 2019-03-12 10:40
 * @author fishYu
**/

const router = require('koa-router')();

module.exports = router.get('/', async (ctx) => {
    let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
      <li><a href="/api/get/data.json">/api/get/data.json</a></li>
      <li><a href="/api/get/user.json">/api/get/user.json</a></li>
      <li><a href="/api/get/demo">/api/get/demo</a></li>
      <li><a href="/api/get/user?a=1&b=2">/api/get/user?a=1&b=2</a></li>
      <li><a href="/api/get/testPost">/api/get/testPost</a></li>
    </ul>
    `;
    ctx.body = html;
});