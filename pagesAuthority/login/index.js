// pages/login/index.js
import WxValidate from '../../utils/wx-validate'
import { login, getUserInfo } from '../../utils/api/modules/security'
const app = getApp()
Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    formData:{
      username: null,
      password: null
    },
    loading: false
  },
  login(){
    let formData = this.clone(this.data.formData)
    if (!this.wxValidate.checkForm(formData)) {
      const error = this.wxValidate.errorList[0]
      this.$showToast(error.msg)
      return false
    }
    this.setData({loading: true})
    login(formData).then((res) => {
      if (!res || !res.success) {
        this.$showToast((res && res.message) || '登录失败')
        return null
      }
      const token = res.data.authorization
      this.setStorage('token', token)
      return getUserInfo({ userId: res.data.userId }).then((info) => {
        if (!info || !info.success) {
          this.$showToast((info && info.message) || '获取用户信息失败')
          return
        }
        const userInfo = info.data.user
        this.setStorage('userInfo', userInfo)
        const storedAccount = this.getStorage('loginAccount')
        const loginAccount = Array.isArray(storedAccount) ? storedAccount : []
        const existIndex = this.objectIndexInArray(loginAccount, userInfo, 'userId')
        const account = { token, ...userInfo }
        if (existIndex === -1) {
          loginAccount.push(account)
        } else {
          loginAccount.splice(existIndex, 1, account)
        }
        this.setStorage('loginAccount', loginAccount)
        this.routeToHome()
      })
    }).catch((error) => {
      this.$showToast((error && error.message) || '登录失败，请稍后重试')
    }).finally(() => {
      this.setData({ loading: false })
    })
  },
  initValidate() {
    const rules = {
      username: {
        required: true
      },
      password: {
        required: true
      }
    }
    const messages = {
      username: {
        required: '请填写帐号'
      },
      password: {
        required: '请填写密码'
      }
    }
    this.wxValidate = new WxValidate(rules, messages)
  },
  onLoad(options) {
    this.initValidate()
  }
})