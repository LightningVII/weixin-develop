'use strict'
import path from 'path';
const util = require('./libs/util');
const wechat_file = path.join(__dirname, './config/wechat.txt')

const config = {
    wechat: {
        appId: 'wx6751a62715a30bc4',
        appSecret: "b8e46c17ecdb2be5c86042c80264c286",
        token: "eshipping",
        getAccessToken: () => {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken: (data) => {
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file, data)
        }
    }
}

module.exports = config