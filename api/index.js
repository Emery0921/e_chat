import request from './request'

// 获取好友列表
export const getFriendListReq = ({userId,state})=>request.post('/user/list',{userId,state})

// 登录
export const loginReq = ({username,password})=>request.post('/login',{userInfo:username,password})

// 注册
export const registerReq = ({username,email,password})=>request.post('/register',{userName:username,email,password})
