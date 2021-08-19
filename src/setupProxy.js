const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    // /api 表示代理路径
    // target 表示目标服务器的地址
    app.use(
        proxy.createProxyMiddleware('/api', {  //`api`是需要转发的请求 
          target: 'https://web.tootz.cn',  // 这里是接口服务器地址
          changeOrigin: true
        })
      )
}