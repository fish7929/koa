/**
 * @component index.js
 * @description 学习koa2的入口
 * @time 2019-03-11 18:40
 * @author fishYu
 **/


const Koa = require('koa');
const fs = require('fs');   //文件读写
const path = require('path');
const static = require('koa-static');
//generator中间件开发   需要转换 convert使用  app.use(convert(loggerGenerator()));
// const convert = require('koa-convert');
// const loggerGenerator = require("./middleware/logger-generator");

//async中间件开发 直接调用  app.use(loggerAsync());
const loggerAsync = require("./middleware/logger-async");

const bodyParser = require('koa-bodyparser');    // 使用ctx.body解析中间件

const app = new Koa();

app.use(loggerAsync());

// 使用ctx.body解析中间件
app.use(bodyParser());

//静态文件访问
// const staticPath = './static';
// app.use(static(path.join(__dirname, staticPath)));

/******* 使用模板引擎 *****/
const views = require('koa-views');

/*******简单的路由配置开始***********/
// /**
//  * 用Promise封装异步读取文件方法
//  * @param {string} page html文件名称
//  * @return {promise}
//  */
// function render(page) {
//     return new Promise((resolve, reject) => {
//         let viewUrl = `./view/${page}`;
//         fs.readFile(viewUrl, "binary", (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }

// /**
//  * 根据URL获取HTML内容
//  * @param {string} url koa2上下文的url   ctx.url
//  * @return {string}   获取HTML文件内容
//  */
// async function route(url) {
//     let view = "404.html";
//     switch (url) {
//         case "/":
//             view = "index.html";
//             break;
//         case "/index":
//             view = "index.html";
//             break;
//         case "/todo":
//             view = "todo.html";
//             break;
//         case "/404":
//             view = "404.html";
//             break;

//         default:
//             break;
//     }
//     let html = await render(view);
//     return html;
// }

// app.use(async (ctx) => {
//     // ctx.body = "hello koa2";

//     //实现最简单的路由
//     let url = ctx.request.url;  //请求的url
//     let html = await route(url);
//     ctx.body = html;  //内容展示请求路径
// });

/*******简单的路由配置结束***********/


// app.use(router.routes());   /*启动路由*/
// app.use(router.allowedMethods());
/*
 * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
 * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
 * 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头
 *
*/

/****** 第二种路由配置开始 ********/
// const Router = require('koa-router');
// //子路由1
// let home = new Router();
// home.get("/", async (ctx) => {
//     //从ctx中读取get传值
//     // console.log("ctx query ------> " + ctx.query);  //{ aid: '123' }       获取的是对象   用的最多的方式  **推荐
//     // console.log("ctx querystring ------> " + ctx.querystring);  //aid=123&name=zhangsan      获取的是一个字符串
//     // console.log("ctx url ------> " + ctx.url);   //获取url地址

//     // //ctx里面的request里面获取get传值

//     // console.log("ctx request url ------> " + ctx.request.url);
//     // console.log("ctx request query ------> " + ctx.request.query);   //{ aid: '123', name: 'zhangsan' }  对象
//     // console.log("ctx request querystring ------> " + ctx.request.querystring);   //aid=123&name=zhangsan

//     let html = `
//     <ul>
//       <li><a href="/page/helloworld">/page/helloworld</a></li>
//       <li><a href="/page/404">/page/404</a></li>
//     </ul>
//   `;
//     ctx.body = html;
// });
// //子路由2
// let page = new Router();
// page.get("/404", async (ctx) => {
//     ctx.body = "404 page!";
// }).get("/helloworld", (ctx) => {
//     ctx.body = "helloworld page!";
// });

// //装载所有子路由
// let router = new Router();
// router.use('/', home.routes(), home.allowedMethods());
// router.use('/page', page.routes(), page.allowedMethods());
/****** 第二种路由配置结束 ********/

/****** 第三种路由配置开始 ********/
// const router = require("./routers/index");
/****** 第三种路由配置结束 ********/

// //加载路由中间件
// app.use(router.routes()).use(router.allowedMethods());


// 静态资源目录对于相对入口文件index.js的路径
// const staticPath = './static';
// const path = require('path');
// const content = require('./util/content');
// const mimes = require('./util/mimes');

// // 解析资源类型
// function parseMime(url) {
//     let extName = path.extname(url);
//     extName = extName ? extName.slice(1) : 'unknown';
//     return mimes[extName];
// }

// app.use(async (ctx) => {
//     // 静态资源目录在本地的绝对路径
//     let fullStaticPath = path.join(__dirname, staticPath);

//     // 获取静态资源内容，有可能是文件内容，目录，或404
//     let _content = await content(ctx, fullStaticPath);

//     // 解析请求内容的类型
//     let _mime = parseMime(ctx.url);

//     // 如果有对应的文件类型，就配置上下文的类型
//     if (_mime) {
//         ctx.type = _mime;
//     }

//     // 输出静态资源内容
//     if (_mime && _mime.indexOf('image/') >= 0) {
//         // 如果是图片，则用node原生res，输出二进制数据
//         ctx.res.writeHead(200);
//         ctx.res.write(_content, 'binary');
//         ctx.res.end();
//     } else {
//         // 其他则输出文本
//         ctx.body = _content;
//     }
// });
//静态资源koa-static中间件使用
// const static = require('koa-static');
// const path = require('path');
// 静态资源目录对于相对入口文件index.js的路径
// const staticPath = './static';
// app.use(static(path.join(__dirname, staticPath)));
//默认其他是hello world
//cookies  配置
// app.use(async (ctx) => {
//     if (ctx.url === '/index') {   //设置cookies
//         ctx.cookies.set(
//             'cid',
//             'hello world',
//             {
//                 domain: 'localhost',  // 写cookie所在的域名
//                 path: '/index',       // 写cookie所在的路径
//                 maxAge: 10 * 60 * 1000, // cookie有效时长
//                 expires: new Date('2019-05-15'),  // cookie失效时间
//                 httpOnly: false,  // 是否只用于http请求中获取
//                 overwrite: false  // 是否允许重写
//             }
//         );
//         ctx.body = 'cookie is ok';
//     } else {
//         ctx.body = 'hello world';
//     }
// });

/****** session 配置 ********/
// const session = require('koa-session-minimal');
// const MysqlSession = require('koa-mysql-session');

// // 配置存储session信息的mysql
// let store = new MysqlSession({
//     user: 'root',
//     password: 'pass123456',
//     database: 'koa_demo',   //create database koa_demo;
//     host: '127.0.0.1',
//     port: '3306'
// });

// // 存放sessionId的cookie配置
// let cookie = {
//     maxAge: '', // cookie有效时长
//     expires: '',  // cookie失效时间
//     path: '', // 写cookie所在的路径
//     domain: '', // 写cookie所在的域名
//     httpOnly: '', // 是否只用于http请求中获取
//     overwrite: '',  // 是否允许重写
//     secure: '',
//     sameSite: '',
//     signed: ''
// }

// // 使用session中间件
// app.use(session({
//     key: 'SESSION_ID',
//     store: store,
//     cookie: cookie
// }));

// app.use(async (ctx) => {

//     // 设置session
//     if (ctx.url === '/set') {
//         ctx.session = {
//             user_id: Math.random().toString(36).substr(2),
//             count: 0
//         }
//         ctx.body = ctx.session
//     } else if (ctx.url === '/') {

//         // 读取session信息
//         ctx.session.count = ctx.session.count + 1
//         ctx.body = ctx.session
//     }

// })
/******* 使用模板引擎 *****/
// const views = require('koa-views');

// // 加载模板引擎  ejs 模板  ejs模板引擎
// app.use(views(path.join(__dirname, './view'), {
//     extension: 'ejs'
// }));
// //渲染模板文件
// app.use(async (ctx) => {
//     let title = 'hello koa2';
//     await ctx.render('index', {
//         title,
//     })
// });
/********busboy 是用来解析出请求中文件流 ******/
const { uploadFile } = require('./util/upload');
app.use(async (ctx) => {

    if (ctx.url === '/' && ctx.method === 'GET') {
        // 当GET请求时候返回表单页面
        let html = `
        <h1>koa2 upload demo</h1>
        <form method="POST" action="/upload.json" enctype="multipart/form-data">
          <p>file upload</p>
          <span>picName:</span><input name="picName" type="text" /><br/>
          <input name="file" type="file" /><br/><br/>
          <button type="submit">submit</button>
        </form>
      `
        ctx.body = html

    } else if (ctx.url === '/upload.json' && ctx.method === 'POST') {
        // 上传文件请求处理
        let result = { success: false }
        let serverFilePath = path.join(__dirname, 'upload-files')

        // 上传文件事件  保存地址 /upload-files/album/filename
        result = await uploadFile(ctx, {
            fileType: 'album', // common or album
            path: serverFilePath
        })

        ctx.body = result
    } else {
        // 其他请求显示404
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
    }
})
app.listen(3000, () => {
    console.log('[demo] start-quick is starting at port 3000');
});

//执行脚本  node -harmony index.js