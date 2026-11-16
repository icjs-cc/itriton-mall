import { queryGoods } from '../../utils/catalog.js'
const app = getApp()

Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    title: '商品',
    keyword: '',
    category: '',
    list: [],
  },
  apply(keyword = this.data.keyword) {
    this.setData({
      keyword,
      list: queryGoods({ category: this.data.category, keyword }),
    })
  },
  onSearch(e) {
    this.apply(e.detail.value || '')
  },
  onLoad(options) {
    this.setData({
      title: options.title || '商品',
      category: options.category || '',
      keyword: options.keyword || '',
    })
    this.apply(options.keyword || '')
  },
})
