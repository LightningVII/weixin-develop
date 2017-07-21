'use strick'
const Promise = require("bluebird")
const request = Promise.promisify(require('request'))
const fs = require("fs")
const _ = require("lodash")

const util = require("./util")
const prefix = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
  accessToken: prefix + 'token?grant_type=client_credential',
  temporary: {
    upload: prefix + 'media/upload?',
    fetch: prefix + 'media/get?',
  },
  permanent: {
    upload: prefix + 'material/add_material?',
    del: prefix + 'material/del_material?',
    update: prefix + 'media/update_news?',
    fetch: prefix + 'material/get_material?',
    uploadNews: prefix + 'material/add_news?',
    uploadNewsPic: prefix + 'meterial/uploadimg?',
    count: prefix + 'meterial/get_materialcount?',
    batch: prefix + 'meterial/batchget_material?'
  }
}

class Wechat {
  constructor(opts, weixin) {
    const self = this
    this.appId = opts.appId
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken
    this.fetchAccessToken()
  }
  updateAccessToken = () => {
    const appId = this.appId
    const appSecret = this.appSecret
    const url = api.accessToken + '&appId=' + appId + '&secret=' + appSecret

    return new Promise((resolve, reject) => {
      request({
        url: url,
        json: true
      }).then(response => {
        const data = response.body
        const now = (new Date().getTime())
        const expires_in = now + (data.expires_in - 20) * 1000

        data.expires_in = expires_in

        resolve(data)
      })
    })
  }
  uploadMaterial = (type, material, permanent) => {
    const self = this
    let form = {}
    let uploadUrl = api.temporary.upload
    if (permanent) {
      uploadUrl = api.permanent.upload
      _.extend(form, permanent)
    }

    switch (type) {
      case "pic":
        uploadUrl = api.permanent.uploadNewsPic
        break;
      case 'news':
        uploadUrl = api.permanent.uploadNews
        form = material
        break;
      default:
        form.media = fs.createReadStream(material)
    }

    return new Promise((resolve, reject) => {
      self.fetchAccessToken().then(function (data) {
        let url = uploadUrl + 'access_token=' + data.access_token
        if (!permanent) {
          url += '&type=' + type
        } else {
          form.access_token = data.access_token
        }

        const options = {
          method: 'POST',
          url: url,
          json: true
        }

        if (type === 'news') {
          options.body = form
        } else {
          options.formData = form
        }

        request(options).then(response => {
            console.log(response.body)
          const _data = response.body
          if (_data) {
            resolve(_data)
          } else {
            throw new Error('Upload material fails')
          }
        }).catch(function (err) {
          reject(err)
        })
      })
    })
  }
  fetchMaterial = (mediaId, type, permanent) => {
    const self = this
    let fetchUrl = api.temporary.fetch
    if (permanent) {
      fetchUrl = api.permanent.fetch
    }

    return new Promise((resolve, reject) => {
      self.fetchAccessToken().then(function (data) {
        let url = fetchUrl + 'access_token=' + data.access_token + '&media_id=' + mediaId

        const options = {
          method: 'POST',
          url: url,
          json: true
        }
        const form = {}

        if (permanent) {
          form.media_id = mediaId
          form.access_token = data.access_token
          options.body = form
        } else {
          if (type === 'video') {
            url = url.replace('https://', 'http://')
          }

          url += '&media_id=' + mediaId
        }

        if (type === 'news' || type === 'video') {
          request(options).then(response => {
            const _data = response[1]
            if (_data) {
              resolve(_data)
            } else {
              throw new Error('Upload material fails')
            }
          }).catch(function (err) {
            reject(err)
          })
        } else {
          resolve(url)
        }
      })
    })
  }
  deleteMaterial = (mediaId) => {
    const self = this
    const form = {
      media_id: mediaId
    }

    return new Promise((resolve, reject) => {
      self.fetchAccessToken().then(function (data) {
        let url = api.permanent.del + 'access_token=' + data.access_token + '&media_id=' + mediaId

        request({
          method: 'POST',
          url: url,
          body: form,
          json: true
        }).then(response => {
          const _data = response.body
          if (_data) {
            resolve(_data)
          } else {
            throw new Error('Delete material fails')
          }
        }).catch(function (err) {
          reject(err)
        })
      })
    })
  }
  updateMaterial = (mediaId, news) => {
    const self = this
    const form = {
      media_id: mediaId
    }

    _.extend(form, news)

    return new Promise((resolve, reject) => {
      self.fetchAccessToken().then(function (data) {
        let url = api.permanent.update + 'access_token=' + data.access_token + '&media_id=' + mediaId

        request({
          method: 'POST',
          url: url,
          body: form,
          json: true
        }).then(response => {
          const _data = response.body
          if (_data) {
            resolve(_data)
          } else {
            throw new Error('Delete material fails')
          }
        }).catch(function (err) {
          reject(err)
        })
      })
    })
  }
  fetchAccessToken = data => {
    const self = this
    if (this.access_token && this.expires_in) {
      if (this.isValidAccessToken(this)) {
        return Promise.resolve(this)
      }
    }
    this.getAccessToken().then(data => {
      try {
        data = JSON.parse(data)
      } catch (e) {
        return self.updateAccessToken(data)
      }
      if (self.isValidAccessToken(data)) {
        return Promise.resolve(data)
      } else {
        return self.updateAccessToken()
      }
    }).then(data => {
      self.access_token = data.access_token
      self.expires_in = data.expires_in
      self.saveAccessToken(data)

      return Promise.resolve(data)
    })
  }
  isValidAccessToken = data => {
    if (!data || !data.access_token || !data.expires_in) {
      return false
    }
    const access_token = data.access_token
    const expires_in = data.expires_in
    const now = (new Date().getTime())

    if (now < expires_in) {
      return true
    } else {
      return false
    }
  }
  countMaterial = () => {
    const self = this

    return new Promise((resolve, reject) => {
      self.fetchAccessToken().then(function (data) {
        let url = api.permanent.count + 'access_token=' + data.access_token

        request({
          method: 'GET',
          url: url,
          json: true
        }).then(response => {
          const _data = response.body
          if (_data) {
            resolve(_data)
          } else {
            throw new Error('Count material fails')
          }
        }).catch(function (err) {
          reject(err)
        })
      })
    })
  }
  batchMaterial = (options) => {
    const self = this

    options.type = options.type || 'image'
    options.type = options.offset || 0
    options.type = options.count || 1

    return new Promise((resolve, reject) => {
      self.fetchAccessToken().then(function (data) {
        let url = api.permanent.batch + 'access_token=' + data.access_token

        request({
          method: 'GET',
          url: url,
          body: options,
          json: true
        }).then(response => {
          const _data = response.body
          if (_data) {
            resolve(_data)
          } else {
            throw new Error('Batch material fails')
          }
        }).catch(function (err) {
          reject(err)
        })
      })
    })
  }
  reply = (obj, res) => {
    const content = obj.body
    const message = obj.weixin
    const xml = util.tpl(content, message)
    console.log(xml)
    res.status = 200
    res.type = 'application/xml'
    res.body = xml
    return
  }
}

module.exports = Wechat
