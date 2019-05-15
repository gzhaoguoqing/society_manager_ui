var webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ]
  },
  devServer: {
    port: 8010,
    proxy: {
      // 请求到 '/device' 下 的请求都会被代理到 target： http://debug.xxx.com 中
      '/api/*': {
        target: 'http://localhost:8080',
        secure: false, // 接受 运行在 https 上的服务
        changeOrigin: true
      }
    }
  }
}
