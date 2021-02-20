const rp = require('request-promise')
const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname,'./access_token.json')
const APPID = 'wxcdaa69d8ff806b01'
const APPSECRET = '668987asdsa255fdf6sc'//这里需要填写自己的小程序密钥，由于密钥要妥善保管，因此这里的密钥是我随便写的，真正的密钥就不展示了
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
const updateAccessToken = async () => {
const res = await rp(URL)
const result = JSON.parse(res)
// console.log(result)
//将拿到的access_token写进文件中保存
if(result.access_token){
    fs.writeFileSync(fileName, JSON.stringify({
        access_token:result.access_token,
        createTime: new Date()
    }))
}else{
  await updateAccessToken()
}
}
//从文件中拿取access_token
const getAccessToken = async () => {
    try {
        const res =  fs.readFileSync(fileName, 'utf8')
        const result = JSON.parse(res)
        console.log(result)
        const createTime = new Date(result.createTime).getTime()
        const nowTime  = new Date().getTime()
        if((nowTime - createTime)/1000/60/60 >=2){
            await updateAccessToken()
            await getAccessToken()

        }
        return result.access_token
        
    } catch (error) {
        await updateAccessToken()
        await getAccessToken()
    }

}

setInterval(async() => {
    await updateAccessToken()
  
},(7200-300)*1000)
// console.log(getAccessToken())
// updateAccessToken()
module.exports = getAccessToken
