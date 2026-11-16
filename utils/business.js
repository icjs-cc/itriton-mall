import { getStorage } from "./storage"
import { clone, isEmpty } from "./util"
import { routeToLogin, router } from "./router"

/**
 * 是否登录
 */
export const isLogin = () => {
  return !isEmpty(getStorage('userInfo'))
}

/**
 * 未登录拦截到登录页，返回是否已拦截
 */
export const noLoginIntercept = () => {
  if (isLogin()) return false
  routeToLogin()
  return true
}

const needAuth = (isauth) => {
  return isauth === true || isauth === 'true' || isauth === 1 || isauth === '1'
}

/**
 * 跳转到下一页
 * @param {*} e
 */
export const routeToNext = (e) => {
  const dataset = (e && e.currentTarget && e.currentTarget.dataset) || {}
  const url = dataset.url
  const type = dataset.type
  if (!url) return
  if (needAuth(dataset.isauth) && !isLogin()) {
    routeToLogin()
    return
  }
  router(url, type)
}

/**
 * 设置页面formData数据
 */
export const bindInputFormData = (e) => {
  const param = e.currentTarget.dataset.param
  const value = e.detail.value
  const pages = getCurrentPages()
  const curPage = pages[pages.length - 1]
  if (!curPage || !param) return
  curPage.setData({
    formData: {
      ...(curPage.data.formData || {}),
      [param]: value
    }
  })
}

/**
 * 克隆页面中的初始化formData
 */
export const cloneFormData = () => {
  const pages = getCurrentPages()
  const curPage = pages[pages.length - 1]
  if (!curPage || !curPage.data || !curPage.data.formData) return
  curPage.setData({
    defaultFormData: clone(curPage.data.formData)
  })
}

export const $page = (delta = 0) => {
  const pages = getCurrentPages()
  return pages[pages.length - 1 + delta]
}

/**
 * 收起 page 组件的首屏 loading
 */
export const hidePageLoading = function () {
  const ctx = this
  wx.nextTick(() => {
    const page = ctx.selectComponent && ctx.selectComponent('#page')
    if (page && page.hideLoading) page.hideLoading()
  })
}
