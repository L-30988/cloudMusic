const getAccessToken = require('../utils/getAccessToken.js')
const rp = require('request-promise')
const fs =require('fs')


const callCloudStorage = {
    async download(ctx,fileList) {
        const  access_token =await getAccessToken()
        const url  = `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${access_token}`
        const options = {
            method: 'POST',
            uri: url,
            body: {
                env:ctx.state.env,
                file_list:fileList
            },
    
            json: true 
        }; 
        
    return  await rp(options)
    .then( (res) => {
    //  return  JSON.parse(res.resp_data).data
    return res
    })
    .catch( (err) => {
       console.log(err)
        // POST failed...
    });

    },
    async upload(ctx) {
        //1获取上传链接
      const  access_token =await getAccessToken()
      const file = ctx.request.files.file
     
      const path = `picUrl/${Date.now()}-${Math.random()}-${file.name}`
      const url = `https://api.weixin.qq.com/tcb/uploadfile?access_token=${access_token}`
      
      const options = {
        method: 'POST',
        uri: url,
        body: {
            env:ctx.state.env,
            path
        },

        json: true 
    }; 
    const info =  await  rp(options)
    .then( (res) => {
    //  return  JSON.parse(res.resp_data).data
    return res
    })
    .catch( (err) => {
       console.log(err)
        // POST failed...
    });
    // console.log(info)

    
 //2.拿到上传的url上传图片
 const params= {
    method: 'POST',
   headers:{
       'content-type':'multipart/form-data'
   },
   uri:info.url,
    formData:{
        key:path,
        Signature:info.authorization,
        'x-cos-security-token':info.token,
        'x-cos-meta-fileid':info.cos_file_id,
           file:fs.createReadStream(file.path)

    },
    json: true 
}; 

  await rp(params)
  return info.file_id
    },

    async delStorage(ctx,fileId) {
        const  access_token =await getAccessToken()
        const url  = `https://api.weixin.qq.com/tcb/batchdeletefile?access_token=${access_token}`
        const options = {
            method: 'post',
            uri: url,
            body: {
                env:ctx.state.env,
                fileid_list:fileId
            },
    
            json: true 
        };
        return  await rp(options)
        .then( (res) => {
        //  return  JSON.parse(res.resp_data).data
        return res
        })
        .catch( (err) => {
           console.log(err)
            // POST failed...
        });

    }
}
module.exports = callCloudStorage