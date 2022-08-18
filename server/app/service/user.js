"use strict"

const Service = require("egg").Service

class UserService extends Service {
  // 注册
  async createUser(data) {
    const { ctx } = this
    const oldUser = await ctx.model.User.findOne({
      email: data.email,
    })
    const oldUser1 = await ctx.model.User.findOne({
      userName: data.userName,
    })
    if (oldUser || oldUser1) {
      return {
        code: 1,
        msg: "用户名或邮箱已注册",
      }
    }
    const hash = await ctx.helper.genSaltPassword(data.password)
    data.password = hash
    await ctx.model.User.create({
      ...data,
      registerTime: ctx.helper.moment().unix(),
    })
    return {
      msg: "注册成功",
    }
  }
  // 邮箱验证
  async email(data) {
    const { ctx } = this
    ctx.helper.sendEmail(data.email)
    return {
      code: 0,
      msg: "邮箱发送成功",
    }
  }
  // 登录
  async login(data) {
    const { ctx, app } = this
    const loginCon = {
      $or: [{ userName: data.userInfo }, { email: data.userInfo }],
    }
    const oldUser = await ctx.model.User.findOne(loginCon)
    if (!oldUser) {
      return {
        code: 1,
        msg: "用户名或密码错误",
      }
    }
    const isMatch = await ctx.helper.comparePassword(
      data.password,
      oldUser.password
    )
    if (!isMatch) {
      return {
        code: 1,
        msg: "用户名或密码错误",
      }
    }
    const token = app.jwt.sign({ ...oldUser }, app.config.jwt.secret, {
      expiresIn: "6h",
    })
    ctx.cookies.set("token", token, {
      maxAge: "24h",
      httpOnly: true,
    })
    return {
      code: 0,
      msg: "登录成功",
      data: {
        token,
        userName: oldUser.userName,
        imgUrl: oldUser.imgUrl,
      },
    }
  }
  // 搜索好友
  async searchUser(data) {
    const { ctx } = this
    console.log(data, "data")
    const queryCon = {
      $or: [
        {
          userName: {
            $regex: new RegExp(data.userInfo, "i"),
          },
        },
        {
          email: {
            $regex: new RegExp(data.userInfo, "i"),
          },
        },
      ],
    }

    const totalUsers = await ctx.model.User.find(queryCon).countDocuments()
    const users = await ctx.model.User.find(queryCon)
    console.log(totalUsers, 1)
    return {
      code: 0,
      msg: "搜索成功",
      data: users,
      totalUsers,
    }
  }
  // 判断是否为好友
  async isFriend(data) {
    const { ctx } = this
    const queryCon = {
      userId: data.userId,
      friendId: data.friendId,
      state: 0,
    }
    const friend = await ctx.model.Friend.find(queryCon)
    if (friend && friend.length !== 0) {
      return {
        code: 0,
        data: friend,
      }
    }
  }
  // 用户详情
  async userDetail(id) {
    const { ctx } = this
    console.log("id: ", id)
    const queryCon = {
      _id: id,
    }
    const userDetail = await ctx.model.User.findOne(queryCon)
    if (!userDetail) {
      return {
        code: 1,
        msg: "该用户不存在",
      }
    }
    return {
      code: 0,
      msg: "获取用户详情成功",
      data: userDetail,
    }
  }
  // 用户详情修改
  async userDetailUpdate(data) {
    const { ctx } = this
    const queryCon = {
      _id: data.id,
    }
    const userDetail = await ctx.model.User.findOne(queryCon)
    if (!userDetail) {
      return {
        code: 1,
        msg: "该用户不存在",
      }
    }
    const oldUserName = await ctx.model.User.findOne({
      userName: data.userName,
    })
    if (oldUserName) {
      return {
        code: 1,
        msg: "该用户名已存在，请重新输入",
      }
    }
    await ctx.model.User.updateOne(queryCon, data)
    return {
      code: 0,
      msg: "用户详情修改成功",
    }
  }
  // 用户密码修改
  async userPwdUpdate(data) {
    const { ctx } = this
    const queryCon = {
      _id: data.id,
    }
    const userDetail = await ctx.model.User.findOne(queryCon)
    if (!userDetail) {
      return {
        code: 1,
        msg: "该用户不存在",
      }
    }
    const hash = await ctx.helper.genSaltPassword(data.password)
    await ctx.model.User.updateOne(queryCon, {
      password: hash,
    })
    return {
      code: 0,
      msg: "用户密码修改成功",
    }
  }
  // 获取好友备注
  async getFriendNickname(data) {
    const { ctx } = this
    const queryCon = {
      userId: data.userId,
      friendId: data.friendId,
    }
    const friend = await ctx.model.Friend.findOne(queryCon)
    if (!friend) {
      return {
        code: 1,
        msg: "该好友不存在",
      }
    }
    return {
      code: 0,
      msg: "好友昵称获取成功",
      data: friend.nickName,
    }
  }
  // 修改好友备注
  async updateFriendNickname(data) {
    const { ctx } = this
    const queryCon = {
      userId: data.userId,
      friendId: data.friendId,
    }
    const friend = await ctx.model.Friend.findOne(queryCon)
    if (!friend) {
      return {
        code: 1,
        msg: "该好友不存在",
      }
    }
    await ctx.model.User.updateOne(queryCon, {
      nickName: data.nickName,
    })
    return {
      code: 0,
      msg: "好友昵称修改成功",
    }
  }
  // 添加好友
  // 添加好友表
  async addFriend(userId, friendId, state) {
    const { ctx } = this
    const data = {
      userId,
      friendId,
      state,
      nickName: "",
      time: ctx.helper.moment().unix(),
      lastTime: ctx.helper.moment().unix(),
    }
    await ctx.model.Friend.create(data)
  }
  // 添加一对一消息
  async insertMsg(data) {
    const { ctx } = this
    const params = {
      userId: data.userId,
      friendId: data.friendId,
      message: data.message,
      types: data.type,
      state: 1,
      time: ctx.helper.moment().unix(),
    }
    await ctx.model.Message.create(params)
  }
  // 好友最后通讯时间
  async updateFriendLastTime(userId, friendId) {
    const { ctx } = this
    const queryCon = {
      userId,
      friendId,
    }
    await ctx.model.Friend.updateOne(queryCon, {
      lastTime: ctx.helper.moment().unix(),
    })
  }
  // 好友申请
  async applyFriend(data) {
    const { ctx } = this
    // 判断是否为第一次好友申请
    const queryCon = {
      userId: data.userId,
      friendId: data.friendId,
    }
    const index = await ctx.model.Friend.find(queryCon).countDocuments()
    if (index == 0) {
      // 初次申请好友
      this.addFriend(data.userId, data.friendId, 2)
      this.addFriend(data.friendId, data.userId, 1)
    } else {
      this.updateFriendLastTime(data.userId, data.friendId)
      this.updateFriendLastTime(data.friendId, data.userId)
    }
    this.insertMsg({
      userId: data.userId,
      friendId: data.friendId,
      message: data.message,
      type: 0,
    })
    return {
      code: 0,
      msg: "发送成功",
    }
  }
  //更新好友状态
  async updateFriendState(data) {
    const { ctx } = this
    const queryCon = {
      $or: [
        { userId: data.userId, friendId: data.friendId },
        { userId: data.friendId, friendId: data.userId },
      ],
    }
    await ctx.model.Friend.updateMany(queryCon, { state: 0 })
    return {
      code: 0,
      msg: "好友添加成功",
    }
  }
  //拒绝好友或者删除好友
  async deleteFriend(data) {
    const { ctx } = this
    const queryCon = {
      $or: [
        { userId: data.userId, friendId: data.friendId },
        { userId: data.friendId, friendId: data.userId },
      ],
    }
    const friends = await ctx.model.Friend.find(queryCon)
    const isFriend = friends.every((item) => item.state === 0)
    await ctx.model.Friend.deleteMany(queryCon)
    return {
      code: 0,
      msg: isFriend ? "好友删除成功" : "拒绝好友申请",
    }
  }
  //按要求获取用户列表
  async getUserList(data) {
    const { ctx } = this
    const queryCon = {
      userId: data.userId,
      state: data.state,
    }
    const friends = await ctx.model.Friend.find(queryCon).populate("friendId")
    console.log("friend", friends, friends.length)
    // 查找friendId， 关联的user对象
    /*  let userResult = await ctx.model.Friend.aggregate([
      {
        $lookup: {
          from: "user",
          localField: "friendId",
          foreignField: "userId",
          as: "users",
        },
      },
      {
        $match: {
          userName: {
            $regex: new RegExp("阿", "i"),
          },
        },
      },
    ]) */
    const queryResult = friends.map((item) => {
      return {
        id: item.friendId._id,
        userName: item.friendId.userName,
        nickName: item.nickName,
        lastTime: item.lastTime,
        imgUrl: item.friendId.imgUrl,
      }
    })
    queryResult.sort((a, b) => {
      return b.lastTime - a.lastTime
    })
    return {
      code: 0,
      data: queryResult,
      msg: "查询成功",
    }
  }
  //按要求获取一对一消息
  async getMessageList(data) {
    const { ctx } = this
    const queryCon = {
      $or: [
        { userId: data.userId, friendId: data.friendId },
        {
          userId: data.friendId,
          friendId: data.userId,
        },
      ],
    }
    const message = await ctx.model.Message.find(queryCon)
    console.log("message", message)
    message.sort((a, b) => {
      return b.time - a.time
    })
    return {
      code: 0,
      data: message,
      msg: "查询成功",
    }
  }
  //未读消息数
  async unreadMsg(data) {
    const { ctx } = this
    const queryCon = { userId: data.userId, friendId: data.friendId, state: 1 }
    const messageNums = await ctx.model.Message.find(queryCon).countDocuments()
    return {
      code: 0,
      data: {
        messageNums,
      },
      msg: "查询成功",
    }
  }
  //修改消息状态
  async updateMsgState(data) {
    const { ctx } = this
    const queryCon = { userId: data.userId, friendId: data.friendId, state: 1 }

    await ctx.model.Message.updateMany(queryCon, { state: 0 })
    return {
      code: 0,
      msg: "修改成功",
    }
  }
  // 分页获取消息数据
  async getMsgByPage(data) {
    const { ctx } = this
    const queryCon = {
      $or: [
        { userId: data.userId, friendId: data.friendId },
        {
          userId: data.friendId,
          friendId: data.userId,
        },
      ],
    }
    const messageList = await ctx.model.Message.find(queryCon)
      .sort({ time: -1 })
      .skip((data.page - 1) * data.pageSize)
      .limit(pageSize)
    const messageaAndUser = messageList.populate("userId")
    console.log(messageaAndUser, 1234)
    const oneToOneMsgList = messageaAndUser.map((item) => {
      return {
        id: item._id,
        message: item.message,
        types: item.types,
        time: item.time,
        fromId: item.userId._id,
        imgUrl: item.userId.imgUrl,
      }
    })
    return {
      code: 0,
      msg: "查询成功",
      data: oneToOneMsgList,
    }
  }
}

module.exports = UserService
