// pages/mine/gzh/index.js
const app = getApp()
Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    wechatCode: "icjs"
  },
  copyWechatCode(){
    this.$setClipboardData(this.data.wechatCode).then(()=>{
      this.$showToast("复制成功")
    })
  }
})