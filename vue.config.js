module.exports = {
  devServer: {
    // 跨域处理
    proxy: {
      '/devApi': {
        target: 'http://www.web-jshtml.cn/productapi/token',
        changeOrigin: true,
        pathRewrite: {
          '^/devApi': ''
        }
      }
    }
  }
}
