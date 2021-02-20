const Router = require('koa-router')
const callCloudDB = require('../utils/callCloudDB.js')
const callCloudStorage = require('../utils/callCloudStorage.js')
const router = new Router()

router.get('/list', async(ctx, next) => {
    const params = ctx.request.query
    const query = `db.collection('blog').limit(${params.count}).skip(${params.start}).orderBy('createTime','desc').get()`
  const res = await callCloudDB(ctx, 'databasequery', query)
  ctx.body = {
      code:20000,
      data:res
  }
})

router.get('/remove', async(ctx, next) => {
  const params = ctx.request.query
  console.log(params)
  console.log(params['img[]'])
  
  //1删除云数据库
   query = `db.collection('blog').doc('${params._id}').remove()`
  const blog = await callCloudDB(ctx,'databasedelete', query)
   // 2删除云数据库评论
   query = `db.collection('blog-comment').where({
     blogId:'${params._id}'
   }).remove()`
 const blogComment = await callCloudDB(ctx, 'databasedelete', query)
  // 3删除云存储
  const fileId = params['img[]']
 const blogStorage = await callCloudStorage.delStorage(ctx,[fileId])
 ctx.body = {
   code:20000,
   data:[blog,blogComment,blogStorage]
 }

})

module.exports = router