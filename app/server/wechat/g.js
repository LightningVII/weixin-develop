'use strick'
const sha1 = require('sha1')
const getRawBody = require('raw-body')
const Wechat = require('./wechat')
const util = require('./util')
const contentType = require('content-type')
const $_GET = function(url) {
    let u = url.split("?");
    if (typeof(u[1]) == "string") {
        u = u[1].split("&");
        const get = {};
        for (const i in u) {
            const j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
}

module.exports = (opts, handler) => {
    const wechat = new Wechat(opts)
    return async(ctx, next) => {
        const param = $_GET(ctx.request.url);
        const token = opts.token;
        const signature = param.signature;
        const nonce = param.nonce;
        const timestamp = param.timestamp;
        const echostr = param.echostr;
        const str = [token, timestamp, nonce].sort().join("");
        const sha = sha1(str)
        let replyObj = {}
        if (ctx.request.method === "GET") {
            if (sha === signature) {
                ctx.response.body = echostr + ""
            } else {
                ctx.response.body = "error"
            }
        } else if (ctx.request.method === "POST") {
            if (sha !== signature) {
                ctx.response.body = "error"
                return false
            }
            const data = await getRawBody(ctx.req, {
                length: ctx.req.length,
                limit: '1mb',
                encoding: ctx.req.charset
            })

            const content = await util.parseXMLAsync(data)
            const message = util.formatMessage(content.xml)
            await handler(next, message, replyObj)
            wechat.reply(replyObj, ctx.response)
            return
        }
    }
}