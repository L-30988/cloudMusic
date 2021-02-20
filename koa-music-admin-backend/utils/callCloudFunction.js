const getAccessToken = require('../utils/getAccessToken.js')
const rp = require('request-promise')


const callCloudFunction = async(ctx, cloudFunctionName,params) => {
  const  access_token = await getAccessToken()
    
  const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${ctx.state.env}&name=${cloudFunctionName}`
    const options = {
        method: 'POST',
        uri: url,
        body: {
           ...params
        },
        json: true 
    };
    
   return  await  rp(options)
        .then( (res) => {
        //  return  JSON.parse(res.resp_data).data
        return res
        })
        .catch( (err) => {
           
            // POST failed...
        });
    

}
module.exports = callCloudFunction