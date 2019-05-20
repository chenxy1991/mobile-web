// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var ip = require('ip');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    host: ip.address(),
    //host: '0.0.0.0',
    port: 8089,
    /* port: 8020, //打包 */
    env: require('./dev.env'),
    autoOpenBrowser: false,//自动打开浏览器
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    /* assetsPublicPath: './',//防止打包后打开空白 */
    proxyTable: {
    /*   '/api': {
          target: 'http://172.16.31.94:8080',
          source:false,
          changeOrigin: true, //跨域
           pathRewrite: {
          '^/api': '/api'
        }
      } */
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
