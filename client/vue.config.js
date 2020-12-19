const path = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
            "~": path.resolve(__dirname, 'src/')
            }
        }
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `
                @import "@/assets/scss/_variables.scss";
                `
            }
        }
    }
};