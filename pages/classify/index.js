import { categoryChildren } from '../../utils/catalog.js'
const app = getApp()
Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    tabList: [
      { name: '礼品系列', key: '1' },
      { name: '花茶系列', key: '2' },
      { name: '办公用茶', key: '3' },
      { name: '茶具茶生活', key: '4' },
      { name: '存茶(收藏)', key: '5' },
      { name: '预定款', key: '6' },
    ],
    current: '1',
    offset: '0rpx',
    list: categoryChildren['1']
  },
  getOffset() {
    if (this._offsetTimer) clearTimeout(this._offsetTimer)
    this._offsetTimer = setTimeout(() => this.measureOffset(0), 30)
  },
  measureOffset(retry) {
    wx.createSelectorQuery()
      .select('.header')
      .boundingClientRect((rect) => {
        if ((!rect || !rect.width) && retry < 5) {
          this._offsetTimer = setTimeout(() => this.measureOffset(retry + 1), 50)
          return
        }
        if (!rect || !rect.width) return
        const offset = `${Math.round(rect.height * (750 / rect.width))}rpx`
        if (offset !== this.data.offset) {
          this.setData({ offset })
        }
      })
      .exec()
  },
  handleChange({ detail }) {
    const current = detail.key
    this.setData({
      current,
      list: categoryChildren[current] || []
    })
  },
  openSearch() {
    const tab = this.data.tabList.find((item) => item.key === this.data.current)
    const title = tab ? tab.name : '商品'
    this.router(`/pagesGoods/list/index?category=${this.data.current}&title=${encodeURIComponent(title)}`)
  },
  openGoods(e) {
    const name = e.currentTarget.dataset.name
    const tab = this.data.tabList.find((item) => item.key === this.data.current)
    this.router(`/pagesGoods/list/index?category=${this.data.current}&keyword=${encodeURIComponent(name)}&title=${encodeURIComponent(tab ? tab.name : '商品')}`)
  },
  onReady() {
    this.hidePageLoading()
    this.getOffset()
  },
  onShow() {
    const key = this.getStorage('classifyKey')
    if (key) {
      this.removeStorage('classifyKey')
      this.setData({
        current: String(key),
        list: categoryChildren[String(key)] || []
      })
    }
    this.getOffset()
  },
  onUnload() {
    if (this._offsetTimer) clearTimeout(this._offsetTimer)
  }
})
