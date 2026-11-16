import images from '../../utils/images.js'
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
    list: [
      { id: 1, name: '茶盘', url: images.classify1 },
      { id: 2, name: '茶荷', url: images.classify2 },
      { id: 3, name: '烧水壶', url: images.classify3 },
      { id: 4, name: '茶巾', url: images.classify4 },
      { id: 5, name: '茶盘', url: images.classify1 },
      { id: 6, name: '茶荷', url: images.classify2 },
      { id: 7, name: '烧水壶', url: images.classify3 },
      { id: 8, name: '茶巾', url: images.classify4 },
    ]
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
    this.setData({
      current: detail.key
    })
  },
  onReady() {
    this.hidePageLoading()
    this.getOffset()
  },
  onShow() {
    this.getOffset()
  },
  onUnload() {
    if (this._offsetTimer) clearTimeout(this._offsetTimer)
  }
})
