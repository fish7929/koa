/**
 * @component api.js
 * @description router 中间件
 * @time 2019-03-12 10:40
 * @author fishYu
**/

const router = require('koa-router')();

module.exports = router.get('/get/data.json', async (ctx) => {
    ctx.body = {
        success: true,
        data: {
            text: 'hello world'
        }
    };
}).get('/get/user.json', async (ctx) => {
    ctx.body = {
        success: true,
        data: {
            text: 'my name is koa.js'
        }
    };
}).get('/get/demo', async (ctx) => {
    let url = ctx.url;
    // 从上下文的request对象中获取
    let request = ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;

    // 从上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;
    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    };
}).get('/get/user', async (ctx) => {
    let url = ctx.url;
    // 从上下文的request对象中获取
    let request = ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;

    // 从上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;
    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    };
}).get('/get/testPost', async (ctx) => {
    // 当GET请求时候返回表单页面
    let html = `
        <h1>koa2 request post demo</h1>
        <form method="POST" action="/api/post/testPost">
            <p>userName</p>
            <input name="userName" /><br/>
            <p>nickName</p>
            <input name="nickName" /><br/>
            <p>email</p>
            <input name="email" /><br/>
            <button type="submit">submit</button>
        </form>
    `;
    ctx.body = html;
}).post('/post/testPost', async (ctx) => {
    if (ctx.url === '/api/post/testPost' && ctx.method === 'POST') {
        // 当POST请求的时候，解析POST表单里的数据，并显示出来
        // let postData = await parsePostData(ctx);

        // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
        let postData = ctx.request.body;
        ctx.body = postData;
    } else {
        // 其他请求显示404
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
    }
});

/**
 * 解析上下文里node原生请求的POST参数
 * @param {object} ctx 请求的上下文
 * @return {promise}
 */
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let _postData = "";
            ctx.req.addListener("data", (data) => {
                _postData += data;
            });
            ctx.req.addListener("end", () => {
                console.log(_postData, 4444);
                let postData = parseQueryStr(_postData);
                resolve(postData);
            });
        } catch (err) {
            reject(err);
        }
    });
}
/**
 * 将post请求的参数字符串解析成功JSON
 * @param {string} queryStr post的请求参数 jsonstring
 * @return {object}
 */
function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    for (let [index, queryStr] of queryStrList.entries()) {  //entries() 该方法返回一个新的Array Iterator对象，该对象包含数组中每个索引对应的键/值对
        // console.log(index);
        let itemList = queryStr.split("=");
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData;
}