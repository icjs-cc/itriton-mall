import { findArticle } from '../../utils/catalog.js'
const app = getApp()

Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    article: null,
  },
  onLoad(options) {
    this.setData({
      article: findArticle(options.id) || null,
    })
  },
})
