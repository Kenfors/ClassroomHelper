//const BundleTracker = require("webpack-bundle-tracker");
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'http://classroomsupport.net/static/dist/' : 'http://127.0.0.1:8080/',
    outputDir: '../static/dist/',

    chainWebpack: config => {

        config.optimization
            .splitChunks(false)

        config
            .plugin('BundleTracker')
            .use(BundleTracker, [{
                filename: process.env.NODE_ENV === 'production' ? '../webapp/webpack-stats-prod.json' : '../webapp/webpack-stats.json'
            }])

        config.resolve.alias
            .set('__STATIC__', 'static')

        config.devServer
            .public('http://127.0.0.1:8080')
            .host('0.0.0.0')
            .port(8080)
            .hotOnly(true)
            .watchOptions({poll: 1000})
            .https(false)
            .headers({"Access-Control-Allow-Origin": ["\*"]})
            }

};