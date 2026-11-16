import { goodsList } from '../../utils/catalog.js'
const app = getApp()
Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    swiperList: [
      { id: 1, url: '/images/resource/banner.png', name: '新品上市' }
    ],
    menuList: [
      { id: 1, url: '/images/resource/icon_classify_1.png', name: '礼品系列' },
      { id: 2, url: '/images/resource/icon_classify_2.png', name: '印记传承' },
      { id: 3, url: '/images/resource/icon_classify_3.png', name: '花茶系列' },
      { id: 4, url: '/images/resource/icon_classify_4.png', name: '办公系列' },
      { id: 5, url: '/images/resource/icon_classify_5.png', name: '品质茶具' },
      { id: 6, url: '/images/resource/icon_classify_6.png', name: '存茶收藏' },
      { id: 7, url: '/images/resource/icon_classify_7.png', name: '预定款' },
      { id: 8, url: '/images/resource/icon_classify_8.png', name: '更多商品' }
    ],
    goodsList: goodsList.slice(0, 4)
  },
  handleSwiperClick() {
    this.router(`/pagesGoods/detail/index?id=${goodsList[0].id}`)
  },
  handleMenuClick(e) {
    const item = e.detail || {}
    const map = { 1: '1', 2: '4', 3: '2', 4: '3', 5: '4', 6: '5', 7: '6', 8: '1' }
    this.setStorage('classifyKey', map[item.id] || '1')
    wx.switchTab({ url: '/pages/classify/index' })
  },
  openSearch() {
    this.router(`/pagesGoods/list/index?title=${encodeURIComponent('搜索商品')}`)
  },
  onReady() {
    this.hidePageLoading()
  },
})
