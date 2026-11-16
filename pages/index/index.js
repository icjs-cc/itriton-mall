import images from '../../utils/images.js'
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
    goodsList: [
      { id: 1, url: images.goods1, name: '贴布日式圆盘特殊日本木质茶盘', price: '128.00' },
      { id: 2, url: images.goods2, name: '商务办公用茶-水仙', price: '198.00' },
      { id: 3, url: images.goods3, name: '商务办公用茶-肉桂', price: '200.00' },
      { id: 4, url: images.goods4, name: '家用简约长方竹制茶盘方形干泡盘小号单人竹制整板', price: '218.00' },
    ]
  },
  handleSwiperClick() {
    this.router('/pagesGoods/detail/index')
  },
  handleMenuClick() {
    wx.switchTab({ url: '/pages/classify/index' })
  },
  onReady() {
    this.hidePageLoading()
  },
})
