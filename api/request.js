import axios from 'axios'

const instance = axios.create({
	timeout:5000,
	baseURL:'http://127.0.0.1:7001/api/v1'
})

instance.interceptors.request.use((config)=>{
	const token = localStorage.getItem('token')
	if(token){
		config.headers['Authorization'] = "Bearer " + token
	}
	// console.log(config,'config')
	return config
},(error)=>{
	return Promise.reject(error)
})

instance.interceptors.response.use((res)=>{
	return res.data
},(error)=>{
	return Promise.reject(error)
})
export default instance