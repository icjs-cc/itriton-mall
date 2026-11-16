import { findGoods, goodsList, addCartItem } from '../../utils/catalog.js'
const app = getApp()

Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    goods: goodsList[0],
    specText: '未选择',
    swiperList: [],
    html: '',
  },
  openSpecs(e) {
    const specs = this.selectComponent('#bizSpecs')
    if (!specs) return
    specs.open(this.data.goods, e.currentTarget.dataset.action || 'select')
  },
  onSpecsConfirm(e) {
    const spec = e.detail.spec
    const action = e.detail.action
    this.setData({ specText: spec })
    if (action === 'cart') {
      addCartItem(this.data.goods, spec)
      this.$showToast('已加入购物车')
    }
    if (action === 'buy') {
      const goods = this.data.goods
      this.setStorage('checkoutGoods', [{
        id: `${goods.id}-${spec}`,
        goodsId: goods.id,
        name: goods.name,
        spec,
        url: goods.url,
        price: Number(goods.price),
        num: 1,
        checked: true,
      }])
      this.router('/pagesOrder/confirm/index')
    }
  },
  openCart() {
    wx.switchTab({ url: '/pages/shopping-cart/index' })
  },
  onLoad(options) {
    const goods = findGoods(options.id) || goodsList[0]
    this.setData({
      goods,
      swiperList: [{ url: goods.url, name: goods.name }],
      html: `<html><body>${goods.desc}</body></html>`,
    })
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      return {
        title: this.data.goods.name,
        imageUrl: this.data.goods.url,
        path: `/pagesGoods/detail/index?id=${this.data.goods.id}`,
        success: () => { }
      }
    }
  }
})
