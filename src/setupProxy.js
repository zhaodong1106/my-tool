const { createProxyMiddleware } = require('http-proxy-middleware');
  module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '^/api',
      {
        target: "http://110.42.211.37:8989",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    )
  );
};