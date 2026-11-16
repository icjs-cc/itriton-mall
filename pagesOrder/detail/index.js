import { getOrders, updateOrder } from '../../utils/catalog.js'
const app = getApp()

Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    order: null,
  },
  loadOrder() {
    const order = getOrders().find((item) => String(item.id) === String(this.orderId))
    this.setData({ order: order || null })
  },
  pay() {
    updateOrder(this.orderId, { status: 'unshipped' })
    this.$showToast('支付成功')
    this.loadOrder()
  },
  receive() {
    updateOrder(this.orderId, { status: 'done' })
    this.$showToast('已确认收货')
    this.loadOrder()
  },
  cancelOrder() {
    this.$showModal({ content: '确定取消该订单？' }).then((res) => {
      if (!res.confirm) return
      updateOrder(this.orderId, { status: 'cancelled' })
      this.$showToast('订单已取消')
      this.loadOrder()
    })
  },
  applyReturn() {
    this.$showModal({ content: '确定申请退货？' }).then((res) => {
      if (!res.confirm) return
      updateOrder(this.orderId, { status: 'returning' })
      this.$showToast('已提交退货申请')
      this.loadOrder()
    })
  },
  openGoods(e) {
    const id = e.currentTarget.dataset.id
    if (!id) return
    this.router(`/pagesGoods/detail/index?id=${id}`)
  },
  onLoad(options) {
    this.orderId = options.id
  },
  onShow() {
    this.loadOrder()
  },
})
