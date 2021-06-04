const path = require('path');
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {//别名
        '@': path.resolve(__dirname, './src'),
        // 'components': path.resolve(__dirname, './src/components'),
      }
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          pathRewrite: { '^/api': '' }
        },
        '/': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          // pathRewrite: { '': '' }
        }
      },
      port: 8001,     // 端口
      // host: '192.168.0.108'
    },

  },
  publicPath: './',
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  css: {
    extract: false
  },
  chainWebpack: config => {
    // GraphQL Loader
    config.module
    // .rule('media')
    // .use('file-loader')
    // .loader('file-loader')
    // .tap(options => {
    //   // 修改它的选项...
    //   return {
    //     name: 'media/[name].[hash:8].[ext]'
    //   }
    // })
    // .end()
    // 你还可以再添加一个 loader
    // .use('other-loader')
    // .loader('other-loader')
  },
}
