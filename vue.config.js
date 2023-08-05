module.exports = {
  publicPath: '/logicard-duel/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/main.scss";'
      }
    }
  }
}
