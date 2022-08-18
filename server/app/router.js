"use strict"

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app
  const baseRouter = app.config.baseRouter
  /* 
    登录注册
  */
  router.post(baseRouter + "/register", controller.user.register) //注册
  router.post(baseRouter + "/login", controller.user.login) //登录
  router.post(baseRouter + "/email", controller.user.email) //邮箱验证
  /* 
    搜索页面
  */
  router.post(baseRouter + "/search/user", jwt, controller.user.searchUser) //搜索用户
  router.post(baseRouter + "/search/group", jwt, controller.group.searchGroup) //搜索群
  router.post(baseRouter + "/search/isFriend", jwt, controller.user.isFriend) //判断是否是好友
  router.post(baseRouter + "/search/isInGroup", jwt, controller.group.isInGroup) //判断是否在群内

  /* 
    用户详情
  */
  router.get(baseRouter + "/user/detail", jwt, controller.user.userDetail) //获取用户详情
  router.put(
    baseRouter + "/user/detail/:id",
    jwt,
    controller.user.userDetailUpdate
  ) //修改用户详情
  router.put(
    baseRouter + "/user/updatePwd/:id",
    jwt,
    controller.user.userPwdUpdate
  ) //修改密码
  router.put(
    baseRouter + "/user/updateFriendNickname/:userId/:friendId",
    jwt,
    controller.user.updateFriendNickname
  ) //修改好友备注
  router.get(
    baseRouter + "/user/updateFriendNickname",
    jwt,
    controller.user.getFriendNickname
  ) //获取好友备注

  /* 
    好友申请
  */
  router.post(baseRouter + "/applyFriend", jwt, controller.user.applyFriend) //添加好友
  router.post(
    baseRouter + "/updateFriendState",
    jwt,
    controller.user.updateFriendState
  ) //更新好友状态
  router.post(baseRouter + "/deleteFriend", jwt, controller.user.deleteFriend) //拒绝好友或者删除好友

  router.post(baseRouter + "/upload", jwt, controller.upload.uploadFile) //上传文件
  router.post(baseRouter + "/user/list", jwt, controller.user.getUserList) //按要求获取好友列表
  router.post(baseRouter + "/user/message", jwt, controller.user.getMessageList) //按要求一对一消息
  router.post(baseRouter + "/user/unreadMsg", jwt, controller.user.unreadMsg) //未读消息
  router.post(
    baseRouter + "/user/updateMsgState",
    jwt,
    controller.user.updateMsgState
  ) //未读消息
  router.post(baseRouter + "/group/list", jwt, controller.group.getGroupList) //按要求获取群列表
  router.post(
    baseRouter + "/group/message",
    jwt,
    controller.group.getMessageList
  ) //按要求获取群消息列表
  router.post(
    baseRouter + "/group/updateMsgState",
    jwt,
    controller.group.updateMsgState
  ) //修改消息状态
  router.post(baseRouter + "/messageByPage", jwt, controller.user.getMsgByPage) //分页获取消息数据
  router.post(baseRouter + "/createGroup", jwt, controller.group.createGroup) //创建群
}
