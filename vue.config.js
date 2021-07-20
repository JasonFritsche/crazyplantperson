const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [new GenerateSW()],
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "/crazyplantperson/" : "/",
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/main.scss";`,
      },
    },
  },
};
