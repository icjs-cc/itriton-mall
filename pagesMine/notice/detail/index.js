// pages/mine/notice/detail/index.js
const app = getApp()
Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme
  },
  onLoad(){
    this.setData({
      notice: this.getStorage('notice')
    })
  }
})