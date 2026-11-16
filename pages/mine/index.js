// pages/mine/index.js
import { getOrders } from '../../utils/catalog.js'
import { getShareImage } from '../../utils/share.js'
const app = getApp()
Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    userInfo: {},
    orderCount: {
      unpaid: 0,
      unshipped: 0,
      unreceived: 0,
      done: 0,
    },
    moduleList: [
      {icon: 'icon-address', name: '我的地址', openType: '', isauth: false, url: '/pagesMine/address/list/index'},
      {icon: 'icon-customer', name: '联系客服', openType: 'contact', isauth: false, url: ''},
      {icon: 'icon-share-full', name: '推荐分享', openType: 'share', isauth: false, url: ''},
      {icon: 'icon-notice', name: '通知公告', openType: '', isauth: false, url: '/pagesMine/notice/index'},
      {icon: 'icon-setup', name: '帐号设置', openType: '', isauth: true, url: '/pagesMine/setting/index'},
    ],
    moduleExtraList: [
      {icon: 'icon-feedback', name: '意见反馈', openType: 'feedback', isauth: false, url: ''},
      {icon: 'icon-about', name: '关于我们', openType: '', isauth: false, url: '/pagesMine/about/index'},
      {icon: 'icon-upgrade', name: '升级日志', openType: '', isauth: false, url: '/pagesMine/upgrade/index'},
    ]
  },
  onShow() {
    const today = this.formatDate(new Date(), 'yyyy-MM-dd')
    const orders = getOrders()
    const count = (status) => orders.filter((item) => item.status === status).length
    this.setData({
      userInfo: this.getStorage('userInfo') || {},
      today,
      orderCount: {
        unpaid: count('unpaid'),
        unshipped: count('unshipped'),
        unreceived: count('unreceived'),
        done: count('done'),
      }
    })
  },
  openOrders(e) {
    const status = e.currentTarget.dataset.status || 'all'
    this.router(`/pagesOrder/list/index?status=${status}`)
  },
  onReady() {
    this.hidePageLoading()
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      return {
        title: `您的好友邀您使用【${this.data.project_cn}】`,
        imageUrl: getShareImage(),
        path: "/pages/index/index",
        success: (res) => { }
      }
    }
  }
})
