import axios from 'axios'


const instance = axios.create({
	timeout: 5000,
	baseURL: 'http://127.0.0.1:7001/api/v1'
})

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers['Authorization'] = "Bearer " + token
	}
	// console.log(config, 'config')
	return config
}, (error) => {
	return Promise.reject(error)
})

instance.interceptors.response.use((res) => {
	// console.log(res, 'res')
	if (res.status === 401) {
		alert('登录已过期，请重新登录')
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	return res.data
}, (error) => {
	return Promise.reject(error)
})
export default instance
