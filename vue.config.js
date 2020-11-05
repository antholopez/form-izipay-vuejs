module.exports = {
  devServer: {
    proxy: {
      '^/api' : {
        target: 'https://api.micuentaweb.pe/api-payment/V4/', // config del proxy
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}