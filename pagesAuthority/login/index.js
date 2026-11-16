// pages/login/index.js
import WxValidate from '../../utils/wx-validate'
import { login, getUserInfo } from '../../utils/api/modules/security'
const app = getApp()
Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    formData:{
      username: '',
      password: ''
    },
    focusedField: '',
    passwordFocus: false,
    showPassword: false,
    fieldErrors: {},
    errorMessage: '',
    loading: false
  },
  handleInput(e) {
    const field = e.currentTarget.dataset.field
    if (field !== 'username' && field !== 'password') return
    this.setData({
      [`formData.${field}`]: e.detail.value,
      [`fieldErrors.${field}`]: '',
      errorMessage: ''
    })
  },
  handleFocus(e) {
    this.setData({ focusedField: e.currentTarget.dataset.field })
  },
  handleBlur(e) {
    const field = e.currentTarget.dataset.field
    const updates = {}
    if (this.data.focusedField === field) updates.focusedField = ''
    if (field === 'password') updates.passwordFocus = false
    this.setData(updates)
  },
  focusPassword() {
    this.setData({ passwordFocus: true })
  },
  togglePassword() {
    this.setData({ showPassword: !this.data.showPassword })
  },
  login(){
    if (this.data.loading) return
    let formData = this.clone(this.data.formData)
    if (!this.wxValidate.checkForm(formData)) {
      const fieldErrors = {}
      this.wxValidate.errorList.forEach((error) => {
        fieldErrors[error.param] = error.msg
      })
      this.setData({ fieldErrors, errorMessage: '' })
      return false
    }
    this.setData({loading: true, fieldErrors: {}, errorMessage: ''})
    return login(formData).then((res) => {
      if (!res || !res.success) {
        this.setData({ errorMessage: (res && res.message) || '登录失败，请检查账号和密码' })
        return null
      }
      const token = res.data.authorization
      this.setStorage('token', token)
      return getUserInfo({ userId: res.data.userId }).then((info) => {
        if (!info || !info.success) {
          this.setData({ errorMessage: (info && info.message) || '获取用户信息失败，请重试' })
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
      this.setData({ errorMessage: (error && error.message) || '登录失败，请稍后重试' })
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
