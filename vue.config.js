const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint语法检查
  lintOnSave: false,
  // 关闭打包时map文件
  productionSourceMap: false,


  // 运行完命令游览器自动打开
  devServer: {
    // port: 8080,
    // host: 'localhost',
    // open: true,

    //webpack配置代理跨域
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' }, //不能变为空因为要使用
      },
    },
  },


})
