'use strict'

const config = require('./config')
const Wechat = require('./wechat/wechat')
const wechatApi = new Wechat(config.wechat)

exports.reply = async(next, message, replyObj) => {
  replyObj.weixin = message

  if (message.MsgType === 'event') {
    switch (message.Event) {
      case "subscribe":
        if (message.EventKey) {
          console.log("二维码：" + message.EventKey + ' ' + message.ticket)
        }
        replyObj.body = 'hi, you are welcome!\r\n messageID：' + message.MsgId
        break;
      case 'unsubscribe':
        replyObj.body = '哼！'
        console.log('无情取消关注');
        break;
      case 'LOCATION':
        replyObj.body = '您上报的位置是：' + message.Latitude + '/' + message.Longitude + '-' + message.Precision
        break;
      case 'CLICK':
        replyObj.body = '您点击了菜单：' + message.EventKey
        break;
      case 'SCAN':
        console.log('关注后扫二维码：' + message.EventKey + ' ' + message.Ticket);
        replyObj.body = '看到你扫了二维码：'
        break;
      case 'VIEW':
        replyObj.body = '您点击了菜单中的链接：' + message.EventKey
        break;
      default:
        console.log('...')
    }
  } else if (message.MsgType) {
    const content = message.Content
    let reply = ''
    let uploadMaterialData = {}
    switch (content) {
      case "1":
        reply = 'first'
        break;
      case '2':
        reply = 'second'
        break;
      case '3':
        reply = 'third'
        break;
      case '4':
        uploadMaterialData = await wechatApi.uploadMaterial('image', __dirname + '/wallhaven-97032.jpg');
        reply = {
          type: uploadMaterialData.type,
          mediaId: uploadMaterialData.media_id,
          createTime: uploadMaterialData.created_at
        }
        break;
      case '5':
        uploadMaterialData = await wechatApi.uploadMaterial('video', __dirname + '/5.mp4');
        reply = {
          title: '标题',
          description: '描述',
          type: uploadMaterialData.type,
          mediaId: uploadMaterialData.media_id,
          createTime: uploadMaterialData.created_at
        }
        break;
      case '6':
        uploadMaterialData = await wechatApi.uploadMaterial('image', __dirname + '/wallhaven-469236.jpg');
        reply = {
          title: '冬天的秘密',
          description: '周传雄',
          type: 'music',
          musicUrl: 'http://music.163.com/#/m/song?id=189545',
          mediaId: uploadMaterialData.media_id
        }
        break;
      case '7':
        uploadMaterialData = await wechatApi.uploadMaterial('image', __dirname + '/wallhaven-97032.jpg', {
          type: 'image'
        });
        reply = {
          type: 'image',
          mediaId: uploadMaterialData.media_id,
          createTime: uploadMaterialData.created_at
        }
        break;
      case '8':
        uploadMaterialData = await wechatApi.uploadMaterial('video', __dirname + '/5.mp4', {
          type: 'video',
          description: '{"title": "Really a nice place", "introduction": "Never think it so easy"}'
        });
        console.log(uploadMaterialData);
        reply = {
          title: '标题',
          description: '描述',
          type: 'video',
          mediaId: uploadMaterialData.media_id,
          createTime: uploadMaterialData.created_at
        }
        break;
      case '9':
        const picData = await wechatApi.uploadMaterial('image', __dirname + '/wallhaven-97032.jpg', {});
        console.log("picData.media_id" + picData.media_id)
        const media = {
          articles: [{
            title: 'Pic',
            thumbMediaId: picData.media_id,
            author: 'Ace',
            digest: '摘要',
            show_cover_pic: 1,
            content: '内容',
            content_source_url: 'https://github.com'
          }]
        }

        let data = await wechatApi.uploadMaterial('news', media, {});
        console.log(data);
        data = await wechatApi.fetchMaterial(data.media_id);

        const items = data.news_item
        const news = []
        items.forEach(function (item) {
          news.push({
            title: item.title,
            decription: item.digest,
            picUrl: picData.url,
            url: item.url
          })
        });

        reply = news
        break;
      default:
        reply = [{
          title: '技术改变世界',
          description: '描述信息',
          picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/oqaSeEdiaW4D6lhW7VStbpY10nUUauibibNia2ich3xdcTjCK' +
            '7tianGV63E5sRTFzibuTefTNMdeVI5IVfhezuSeaIiazg/0',
          url: 'http://www.tuochetong.com'
        }, {
          title: '技术改变世界2',
          description: '描述信息2',
          picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/oqaSeEdiaW4D6lhW7VStbpY10nUUauibibNia2ich3xdcTjCK' +
            '7tianGV63E5sRTFzibuTefTNMdeVI5IVfhezuSeaIiazg/0',
          url: 'http://jira.tuochetong.com'
        }]
    }
    replyObj.body = reply
  }
  await next(replyObj)
}
