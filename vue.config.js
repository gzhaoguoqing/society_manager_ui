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
      '/api/*': {
        target: 'http://localhost:8080',
        secure: false, // 接受 运行在 https 上的服务
        changeOrigin: true
      }
    }
  }
}
