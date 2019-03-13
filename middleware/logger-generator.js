/**
 * @component logger-generator.js
 * @description koa 中间件
 * @time 2019-03-11 18:40
 * @author fishYu
 **/


function log(ctx) {
    console.log(ctx.method, ctx.header.host + ctx.url);
}

module.exports = function () {
    return function* (next) {
        // 执行中间件的操作
        log(this);
        if (next) {
            yield next;
        }
    }
}