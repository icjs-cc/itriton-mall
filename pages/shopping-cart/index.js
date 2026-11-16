import images from '../../utils/images.js'
const app = getApp()

Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    shoppingCartList: [
      { id: 1, name: '贴布日式圆盘特殊日本木质茶盘', spec: '默认', url: images.goods1, price: 198, num: 1, checked: true },
      { id: 2, name: '商务办公用茶-水仙', spec: '一斤装', url: images.goods2, price: 122, num: 2, checked: true },
    ],
    allChecked: true,
    totalPrice: '0.00',
    checkedCount: 0,
  },
  syncCart() {
    const list = this.data.shoppingCartList
    const checked = list.filter((item) => item.checked)
    const total = checked.reduce((sum, item) => sum + Number(item.price) * Number(item.num), 0)
    this.setData({
      allChecked: list.length > 0 && checked.length === list.length,
      totalPrice: total.toFixed(2),
      checkedCount: checked.length,
    })
  },
  radioChange(e) {
    const index = Number(e.currentTarget.dataset.index)
    const item = this.data.shoppingCartList[index]
    if (!item) return
    this.setData({
      [`shoppingCartList[${index}].checked`]: !item.checked
    })
    this.syncCart()
  },
  checkAll() {
    const allChecked = !this.data.allChecked
    const shoppingCartList = this.data.shoppingCartList.map((item) => ({
      ...item,
      checked: allChecked
    }))
    this.setData({ shoppingCartList, allChecked })
    this.syncCart()
  },
  bindInputNumber(e) {
    const num = Number(e.detail.value)
    const index = Number(e.currentTarget.dataset.index)
    const current = this.data.shoppingCartList[index]
    if (!current) return
    if (num <= 0) {
      this.$showModal({ content: '确定要删除此商品？' }).then((res) => {
        if (!res.confirm) {
          this.setData({ [`shoppingCartList[${index}].num`]: current.num })
          return
        }
        const shoppingCartList = this.data.shoppingCartList.filter((item) => item.id !== current.id)
        this.setData({ shoppingCartList })
        this.syncCart()
      })
      return
    }
    this.setData({ [`shoppingCartList[${index}].num`]: num })
    this.syncCart()
  },
  confirm() {
    const goods = this.data.shoppingCartList.filter((item) => item.checked && item.num > 0)
    if (!goods.length) {
      this.$showToast('请先选择商品')
      return
    }
    this.setStorage('checkoutGoods', goods)
    this.router('/pagesOrder/confirm/index')
  },
  onLoad() {
    this.syncCart()
  },
  onReady() {
    this.hidePageLoading()
  },
})
