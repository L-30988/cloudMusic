const getAccessToken = require('../utils/getAccessToken.js')
const rp = require('request-promise')

const callCloudDB = async(ctx, fnName , query={}) => {
    const access_token = await getAccessToken()
    const url = `https://api.weixin.qq.com/tcb/${fnName}?access_token=${access_token}`
    const options = {
        method: 'POST',
        uri: url,
        body: {
            env:ctx.state.env,
            query
        },

        json: true 
    };

    return  await  rp(options)
    .then( (res) => {
    //  return  JSON.parse(res.resp_data).data
    return res
    })
    .catch( (err) => {
       console.log(err)
        // POST failed...
    });

}
module.exports = callCloudDB