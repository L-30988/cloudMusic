const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const app = new Koa()
const router = new Router()
const  ENV =  'chen-wei-lin'

//cors解决跨域
app.use(cors({
    origin:['http://localhost:9528'],
    credentials:true
}))

//解析post请求
app.use(koaBody({
    multipart:true
}))

app.use(async (ctx,next) => {
    //全局中间件
    ctx.state.env = ENV
    await next()
})


const playlist = require('./controller/playlist.js')
const blog = require('./controller/blog.js')
router.use('/blog',blog.routes())
router.use('/playlist',playlist.routes())
app.use(router.routes())
app.use(router.allowedMethods())



app.listen(3000, () => {
    console.log('服务已开启在3000端口')
})