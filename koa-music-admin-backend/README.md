- 这是一个基于koa框架开发的后端项目，koa框架是基于node.js的框架。
- koa框架跟express框架用起来差不多，了解一种框架之后再去了解其他框架，发现他们都有异曲同工之效，在这里学习了koa框架，虽然不敢说精通，但对于他们的基本使用也基本掌握了。
- 在此项目使用了koa  koa-body koa-router koa2-cors request request-promise  

既然是基于koa框架开发的，安装koa是必要的，安装koa-body是为了解决前端传递过来的post请求，它不像get请求一样，post请求是在请求头里，需安装koa-boby解析，然后在app.js即项目入口文件进行简单的配置即可 koa-router即路由，安装路由即可对前端传递过来请求按号入做进行相应的处理，这里在app.js入口文件里配置了，并使用路由嵌套，但访问相应的地址时进入中控服务器（即自己写的服务器）下不同的文件路由，相同类似的路由请求可以写在同一个文件下，便于管理。 koa2-cors是为了解决跨域问题，即前端项目跟后端项目两个项目的域名、端口号等出现不同时就会产生跨域问题，而在koa框架中，提供了koa2-cors来解决跨域问题，具体可以参考koa官网，然后在app.js进行简单配置即可 request request-promise是后端向数据库发起请求的第三方依赖包。  
后端的项目对接的是小程序云开发的数据库，同时在此项目也写了直接调用云数据库、云存储、云函数的方法，之后直接调用即可，对接小程序云服务端提供的云数据库、云存储时，需要获取凭证才可以，同时也需要保存凭证并在之后会相继使用到这个凭证，具体可以看小程序官方文档。总的来说koa框架上手起来比较不错。
