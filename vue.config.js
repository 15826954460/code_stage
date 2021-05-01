
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '' : './', // 本地调试，默认为空
  filenameHashing: false,
  devServer: {
    host: '0.0.0.0',
    port: 10021,
    disableHostCheck: true,
    proxy: 'http://47.100.25.58:8080/',
  },
  productionSourceMap: false,
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }));
  },
};
