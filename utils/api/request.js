import { skipNulls } from '../util.js'

const config = require('../config.js')
const { getStorage } = require('../storage.js')
const { routeToLogin } = require('../router.js')

// 低版本基础库没有 Promise.finally，登录等流程依赖它收起 loading
if (typeof Promise.prototype.finally !== 'function') {
	Promise.prototype.finally = function (callback) {
		const PromiseCtor = this.constructor
		return this.then(
			(value) => PromiseCtor.resolve(callback()).then(() => value),
			(reason) => PromiseCtor.resolve(callback()).then(() => {
				throw reason
			})
		)
	}
}

const request = ({ url, data, method, contentType }) => {
	const token = getStorage('token')
	const header = {
		'content-type': contentType || 'application/json'
	}
	if (token) {
		header.token = token
	}

	return new Promise((resolve, reject) => {
		wx.request({
			url: `${config[config.dev_env].url}${url}`,
			data,
			method,
			header,
			timeout: 15000,
			success: (res) => {
				const body = res.data
				if (res.statusCode !== 200) {
					reject(body || { message: '系统开小差了，请联系在线客服哦~' })
					return
				}
				if (body && body.code === 401) {
					routeToLogin('redirectTo')
					reject(body)
					return
				}
				resolve(body)
			},
			fail: () => {
				reject({ message: '系统开小差了，请联系在线客服哦~' })
			}
		})
	})
}

export const getRequest = (url, data) => {
	return request({
		url,
		data: skipNulls(data),
		method: 'GET'
	})
}

export const postRequest = (url, data, isJson) => {
	return request({
		url,
		data,
		method: 'POST',
		contentType: isJson ? 'application/json' : 'application/x-www-form-urlencoded'
	})
}

export const putRequest = (url, data, isJson) => {
	return request({
		url,
		data,
		method: 'PUT',
		contentType: isJson ? 'application/json' : 'application/x-www-form-urlencoded'
	})
}

export const deleteRequest = (url, data) => {
	return request({
		url,
		data,
		method: 'DELETE'
	})
}

export const getBaseUrl = (url) => {
	return `${config[config.dev_env].url}${url}`
}
