import images from '../../utils/images.js'
const app = getApp()
Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    tabList: [
      { name: '最新', key: 'new' },
      { name: '全部', key: 'all' }
    ],
    current: 'new',
    images
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    })
  },
  onReady() {
    this.hidePageLoading()
  },
})
