import { getOrders, updateOrder } from '../../utils/catalog.js'
const app = getApp()

const titles = {
  all: '我的订单',
  unpaid: '待付款',
  unshipped: '待发货',
  unreceived: '待收货',
  done: '已完成',
}

Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    title: '我的订单',
    status: 'all',
    list: [],
  },
  loadList() {
    const orders = getOrders()
    const status = this.data.status
    this.setData({
      list: status === 'all' ? orders : orders.filter((item) => item.status === status),
    })
  },
  openDetail(e) {
    this.router(`/pagesOrder/detail/index?id=${e.currentTarget.dataset.id}`)
  },
  pay(e) {
    updateOrder(e.currentTarget.dataset.id, { status: 'unshipped' })
    this.$showToast('支付成功')
    this.loadList()
  },
  receive(e) {
    updateOrder(e.currentTarget.dataset.id, { status: 'done' })
    this.$showToast('已确认收货')
    this.loadList()
  },
  cancelOrder(e) {
    const id = e.currentTarget.dataset.id
    this.$showModal({ content: '确定取消该订单？' }).then((res) => {
      if (!res.confirm) return
      updateOrder(id, { status: 'cancelled' })
      this.$showToast('订单已取消')
      this.loadList()
    })
  },
  applyReturn(e) {
    const id = e.currentTarget.dataset.id
    this.$showModal({ content: '确定申请退货？' }).then((res) => {
      if (!res.confirm) return
      updateOrder(id, { status: 'returning' })
      this.$showToast('已提交退货申请')
      this.loadList()
    })
  },
  onLoad(options) {
    const status = options.status || 'all'
    this.setData({
      status,
      title: titles[status] || titles.all,
    })
  },
  onShow() {
    this.loadList()
  },
})
