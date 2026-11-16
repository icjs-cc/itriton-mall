import { getCart, saveCart } from '../../utils/catalog.js'
const app = getApp()

Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    shoppingCartList: [],
    allChecked: true,
    totalPrice: '0.00',
    checkedCount: 0,
  },
  syncCart(list = this.data.shoppingCartList) {
    const checked = list.filter((item) => item.checked)
    const total = checked.reduce((sum, item) => sum + Number(item.price) * Number(item.num), 0)
    saveCart(list)
    this.setData({
      shoppingCartList: list,
      allChecked: list.length > 0 && checked.length === list.length,
      totalPrice: total.toFixed(2),
      checkedCount: checked.length,
    })
  },
  radioChange(e) {
    const index = Number(e.currentTarget.dataset.index)
    const list = this.data.shoppingCartList.map((item, itemIndex) => {
      if (itemIndex !== index) return item
      return { ...item, checked: !item.checked }
    })
    this.syncCart(list)
  },
  checkAll() {
    const allChecked = !this.data.allChecked
    const shoppingCartList = this.data.shoppingCartList.map((item) => ({
      ...item,
      checked: allChecked
    }))
    this.syncCart(shoppingCartList)
  },
  bindInputNumber(e) {
    const num = Number(e.detail.value)
    const index = Number(e.currentTarget.dataset.index)
    const current = this.data.shoppingCartList[index]
    if (!current) return
    if (num <= 0) {
      this.$showModal({ content: '确定要删除此商品？' }).then((res) => {
        if (!res.confirm) {
          this.syncCart(this.data.shoppingCartList.map((item) => ({ ...item })))
          return
        }
        this.syncCart(this.data.shoppingCartList.filter((item) => item.id !== current.id))
      })
      return
    }
    const shoppingCartList = this.data.shoppingCartList.map((item, itemIndex) => {
      if (itemIndex !== index) return item
      return { ...item, num }
    })
    this.syncCart(shoppingCartList)
  },
  openDetail(e) {
    const id = e.currentTarget.dataset.id
    if (!id) return
    this.router(`/pagesGoods/detail/index?id=${id}`)
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
  onShow() {
    this.syncCart(getCart())
  },
  onReady() {
    this.hidePageLoading()
  },
})
