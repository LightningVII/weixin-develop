'use strick'

const fs = require("fs")
const Promise = require("bluebird")
exports.readFileAsync = (fpath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fpath, (err, content) => {
            if (err)
                reject(err)
            else
                resolve(content)
        })
    })
}

exports.writeFileAsync = (fpath, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fpath, content, (err) => {
            if (err)
                reject(err)
            else
                resolve()
        })
    })
}