module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/main.scss";`,
      },
    },
  },
};
