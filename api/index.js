import request from './request'

// 获取好友列表
export const getFriendListReq = ({userId,state})=>request.post('/user/list',{userId,state})

// 登录
export const loginReq = ({username,password})=>request.post('/login',{userInfo:username,password})

// 注册
export const registerReq = ({username,email,password})=>request.post('/register',{userName:username,email,password})

// 搜索好友
export const searchUserReq = ({userInfo})=>request.post('/search/user',{userInfo})

// 搜索群
export const searchGroupReq = ({userInfo})=>request.post('/search/group',{userInfo})

// 获取用户详细信息
export const getUserDetailsReq = (userId)=>
	request.get('/user/detail',{params:{id:userId}})
