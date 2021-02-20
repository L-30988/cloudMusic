const Router = require('koa-router')
const router = new Router()
const rp = require('request-promise')
// const getAccessToken = require('../utils/getAccessToken.js')
const callCloudFunction = require('../utils/callCloudFunction.js')
const callCloudDB = require('../utils/callCloudDB.js')
const callCloudStorage = require('../utils/callCloudStorage.js')


router.get('/list', async (ctx, next) => {
    const query = ctx.request.query
   const res =await callCloudFunction(ctx, 'music', {
        $url:'playlist',
        start:parseInt(query.start),
        count:parseInt(query.count)
    })
    
  
    let data = []
    if(res.resp_data){
        data = JSON.parse(res.resp_data).data

    }

        ctx.body = {
            data,
            code:20000
        }
  
})

router.get('/singleId', async (ctx, next) => {
    const params = ctx.request.query
    const query = `db.collection('playlist').doc('${params.id}').get()`
    const res =await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code:20000,
        data:JSON.parse(res.data)
    }

   
})

router.post('/update', async (ctx, next) => {
    const params = ctx.request.body
    console.log(params)
    const query = `
        db.collection('playlist').doc('${params._id}').update({
            data: {
                name: '${params.name}',
                copywriter: '${params.copywriter}',
                picUrl: '${params.imgUrl}',
                fileId:'${params.fileid}'
            }
        })
    `
    const res = await callCloudDB(ctx, 'databaseupdate', query)
    ctx.body = {
        code: 20000,
        data: res
    }

})

router.post('/imgUrl', async(ctx,next) => {

 
  const fileid = await callCloudStorage.upload(ctx)
  const fileList = [{
    "fileid":fileid,
    "max_age":7200
  }]
 const Url = await callCloudStorage.download(ctx,fileList)
 const res = {
    url: Url.file_list[0].download_url,
    fileid:Url.file_list[0].fileid
}

    ctx.body = {
        code:20000,
        data:res
    }
})

router.get('/del', async(ctx,next) => {
    const fileId = ctx.request.query
    console.log(fileId)
    const fileID = fileId[0]
   

      const delStorage = await callCloudStorage.delStorage(ctx,[fileID])
     ctx.body = {
         code:20000,
         data:delStorage
     }
})

router.get('/remove', async(ctx,next) => {
    const id = ctx.request.query
    console.log(id[0])
    const query = `db.collection('playlist').doc('${id[0]}').remove()`
    const res = await callCloudDB(ctx, 'databasedelete', query)
    ctx.body = {
        code:20000,
        data:res
    }
})

module.exports = router