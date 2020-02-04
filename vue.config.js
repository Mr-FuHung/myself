
module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8001',
          changeOrigin: true,
          pathRewrite: { '^/api': '' }
        }
      }
    }
  },
  publicPath: './',

  css: {
    extract: false
  }
}