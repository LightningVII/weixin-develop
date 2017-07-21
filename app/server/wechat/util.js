'use strick'

const xml2js = require('xml2js')
const tpl = require('./tpl')
const Promise = require("bluebird")

exports.parseXMLAsync = function(xml) {
    return new Promise(function(resolve, reject) {
        xml2js.parseString(xml, { trim: true }, function(err, content) {
            if (err) reject(err)
            else resolve(content)
        })
    })
}

const formatMessage = result => {
    const message = {}
    if (typeof result === 'object') {
        const keys = Object.keys(result)

        for (let i = 0; i < keys.length; i++) {
            const item = result[keys[i]]
            const key = keys[i]

            if (!(item instanceof Array) || item.length === 0) {
                continue
            }
            if (item.length === 1) {
                const val = item[0]

                if (typeof val === 'object') {
                    message[key] = formatMessage(val)
                } else {
                    message[key] = (val || '').trim()
                }
            } else {
                message[key] = []

                for (let j = 0, k = item.length; j < k; j++) {
                    message[key].push(formatMessage(item[j]))
                }
            }
        }
    }
    return message
}

exports.formatMessage = formatMessage
exports.tpl = function(content, message) {
    const info = {}
    let type = 'text'
    const fromUserName = message.FromUserName
    const toUserName = message.ToUserName

    if (Array.isArray(content)) {
        type = 'news'
    }
    console.log(content)
    const msgType = content.type || type
    info.createTime = content.createTime || new Date().getTime()
    info.ToUserName = toUserName
    info.FromUserName = fromUserName

    return tpl.compiled({
        msgType: msgType,
        message: info,
        content: content
    })
}