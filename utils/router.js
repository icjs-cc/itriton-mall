const ROUTER_TYPES = ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch']

/**
 * 跳转到登录页
 */
export const routeToLogin = (type = 'navigateTo') => {
	const pages = getCurrentPages()
	const current = pages[pages.length - 1]
	if (current && current.route === 'pagesAuthority/login/index') {
		return
	}
	// 直接绑定点击事件时，微信会将事件对象作为第一个参数传入。
	const navigationType = typeof type === 'string' ? type : 'navigateTo'
	router('/pagesAuthority/login/index', navigationType)
}

/**
 * 跳转到首页
 */
export const routeToHome = () => {
	router('/pages/index/index', 'reLaunch')
}

/**
 * 路由 navigateTo, redirectTo, switchTab, reLaunch
 */
export const router = (url, type = 'navigateTo') => {
	if (!ROUTER_TYPES.includes(type)) {
		console.warn('type 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch', type)
		return
	}
	if (!url) return
	wx[type]({
		url,
		fail(error) {
			console.warn('路由跳转失败', type, url, error)
		}
	})
}

/**
 * 关闭当前页面，返回上一页面或多级页面
 */
export const back = (delta) => {
	wx.navigateBack({
		delta: delta || 1
	})
}
