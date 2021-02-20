// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

const rp = require('request-promise')

const BASE_URL = 'https://autumnfish.cn'

cloud.init({
  env: 'chen-wei-lin'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  app.router('playlist', async (ctx, next) => {
    ctx.body = await cloud.database().collection('playlist')
      .skip(event.start)
      .limit(event.count)
      .orderBy('createTime', 'desc')
      .get()
      .then((res) => {
        return res
      })
  })

  app.router('banner', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + '/banner')
    .then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('newsong', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + '/personalized/newsong')
    .then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('topsong', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + `/top/song?type=${event.type}`)
    .then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('recommendMV', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + '/personalized/mv')
    .then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('allMV', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + `/mv/all?limit=${event.limit}&offset=${event.offset}&area=${event.area}&type=${event.type}&order=${event.order}`)
    .then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('mvDetail', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + `/mv/detail?mvid=${event.mvId}`).then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('mvComment', async (ctx, next) => {
    ctx.body = await rp(BASE_URL +`/comment/mv?id=${event.mvId}&limit=${event.limit}&offset=${event.offset}`).then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('artistDetail', async(ctx, next) => {
    ctx.body = await rp(BASE_URL + `/artists?id=${event.artistId}`).then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('mvUrl', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + `/mv/url?id=${event.mvId}`).then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('musiclist', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + '/playlist/detail?id=' + parseInt(event.playlistId))
      .then((res) => {
        return JSON.parse(res)
      })
      
  })

  app.router('songDetail', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + `/song/detail?ids=${event.musiclistId}`).then((res) => {
      return JSON.parse(res)
    })
  })

  app.router('musicUrl', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + `/song/url?id=${event.musicId}`).then((res) => {
      return  res
    })
    
  })

  app.router('lyric', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + `/lyric?id=${event.musicId}`).then((res) => {
      return res 
    })
  })

 app.router('defaultSearch', async(ctx, next) => {
   ctx.body = await rp(BASE_URL + `/search/default`).then((res) => {
     return JSON.parse(res)
   })
 })
//这里有个小坑，就是输入中文时返回结果是空或者不正确，英文时却可以，所以为了解决中文没返回结果问题，对整个地址进行了编码后在去请求数据就可以解决了，使用了encodeURI()
 app.router('searchSuggest', async(ctx, next) => {
   ctx.body = await rp(encodeURI(BASE_URL + `/search/suggest?keywords=${event.keyword}&type=mobile`))
   .then((res) => {
     return JSON.parse(res)
   })
 })

 app.router('search', async(ctx, next) => {
   ctx.body = await rp(encodeURI(BASE_URL + `/cloudsearch?keywords=${event.words}&type=${event.type}&limit=${event.limit}&offset=${event.offset}`))
   .then((res) => {
     return JSON.parse(res)
   })
 })

 app.router('hotSearch', async(ctx, next) => {
   ctx.body = await rp(BASE_URL + `/search/hot`).then((res) => {
     return JSON.parse(res)
   })
 })


  return app.serve()
}