import jsonp from 'jsonp'
import request from './request'
import {
	POSITION_KEY,
	CURRENT_POSITION_KEY
} from '@/utils/constant.js'

// 获取好友列表
export const getFriendListReq = ({
	userId,
	state
}) => request.post('/user/list', {
	userId,
	state
})

// 登录
export const loginReq = ({
	username,
	password
}) => request.post('/login', {
	userInfo: username,
	password
})

// 注册
export const registerReq = ({
	username,
	email,
	password
}) => request.post('/register', {
	userName: username,
	email,
	password
})

// 搜索好友
export const searchUserReq = ({
	userInfo
}) => request.post('/search/user', {
	userInfo
})

// 搜索群
export const searchGroupReq = ({
	userInfo
}) => request.post('/search/group', {
	userInfo
})

// 获取用户详细信息
export const getUserDetailsReq = (userId) =>
	request.get('/user/detail', {
		params: {
			id: userId
		}
	})
// 更改用户详细信息
export const updateUserDetailsReq = (data, id) =>
	request.put(`/user/detail/${id}`, data)


//获取行政区域位置请求（高德接口）
export const getPositionReq = (keywords) => {
	return new Promise((resolve, reject) => {
		jsonp(
			`https://restapi.amap.com/v3/config/district?subdistrict=3&keywords=${keywords}&output=json&extensions=base&key=${POSITION_KEY}`,
			(err, data) => {
				if (err) {
					message.error('请求位置接口失败，请联系管理员')
					return new Promise(() => {})
				} else {
					resolve(data)
				}

			}
		)
	})
}

//获取当前位置请求（高德接口）
export const getCurrentPositionReq = (location) => {
	return new Promise((resolve, reject) => {
		jsonp(
			`https://restapi.amap.com/v3/geocode/regeo?location=${location}&output=json&extensions=base&key=${CURRENT_POSITION_KEY}`,
			(err, data) => {
				if (err) {
					message.error('当前位置请求位置接口失败，请联系管理员')
					return new Promise(() => {})
				} else {
					resolve(data)
				}

			}
		)
	})
}
