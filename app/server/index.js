// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
import Koa from 'koa';
import path from 'path';
const wechat = require('./wechat/g');
const util = require('./libs/util');
const config = require('./config');
const wechat_file = path.join(__dirname, './config/wechat.txt');
const weixin = require('./weixin');

// import koaBody from 'koa-body';
// const bodyParser = require('koa-bodyparser');
// const controller = require('./controller');

// // 创建一个Koa对象表示web app本身:

// const body = koaBody({ multipart: true, formidable: { uploadDir: path.join(__dirname, './upload') } });


const app = new Koa();

app.use(wechat(config.wechat, weixin.reply));
// 在端口3000监听:
app.listen(7000);
console.log('app started at port 7000...');