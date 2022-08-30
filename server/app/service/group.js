"use strict"

const Service = require("egg").Service

class GroupService extends Service {
  // 判断是否在群内
  async isInFriend(data) {
    const { ctx } = this
    const queryCon = {
      userId: data.userId,
      groupId: data.groupId,
      state: 0,
    }
    const group = await ctx.model.GroupUser.find(queryCon)
    if (group && group.length !== 0) {
      return {
        code: 0,
        data: group,
      }
    }
  }
  // 搜索群
  async searchGroup(data) {
    const { ctx } = this
    console.log(data, "data")
    const queryCon = {
      name: {
        $regex: new RegExp(data.userInfo, "i"),
      },
    }
    const totalGroups = await ctx.model.Group.find(queryCon).countDocuments()
    const groups = await ctx.model.Group.find(queryCon)
    console.log(totalGroups, 2)
    return {
      code: 0,
      msg: "搜索成功",
      data: groups,
      totalGroups,
    }
  }
  //按要求获取群列表
  async getGroupList(data) {
    const { ctx } = this
    const queryCon = {
      userId: data.userId,
    }
    const groupuser = await ctx.model.GroupUser.find(queryCon).populate(
      "groupId"
    )
    console.log("groupuser", groupuser)
    const queryResult = groupuser.map((item) => {
      return {
        id: item.groupId._id,
        name: item.groupId.name,
        nickName: item.name,
        lastTime: item.lastTime,
        imgUrl: item.groupId.imgUrl,
        tip: item.tip,
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
  //按要求获取群消息
  async getMessageList(data) {
    const { ctx } = this
    const queryCon = {
      groupId: data.groupId,
    }
    const message = await ctx.model.GroupMessage.find(queryCon).populate(
      "userId"
    )
    console.log("message", message)
    const queryResult = message.map((item) => {
      return {
        message: item.message,
        time: item.time,
        types: item.types,
        name: item.userId.userName,
      }
    })
    queryResult.sort((a, b) => {
      return b.time - a.time
    })
    return {
      code: 0,
      data: queryResult,
      msg: "查询成功",
    }
  }
  //修改消息状态
  async updateMsgState(data) {
    const { ctx } = this
    const queryCon = { groupId: data.groupId, userId: data.userId }
    await ctx.model.GroupUser.updateOne(queryCon, { tip: 0 })
    return {
      code: 0,
      msg: "修改成功",
    }
  }
  // 新建群
  async createGroup(data) {
    const { ctx } = this
    const groupData = {
      userId: data.userId,
      name: data.name,
      imgUrl: data.imgUrl,
      time: ctx.helper.moment().unix(),
    }
    const queryCon = {
      name: data.name,
      userId: data.userId,
    }
    const oldGroup = await ctx.model.Group.findOne(queryCon)
    if (oldGroup) {
      return {
        code: 1,
        msg: "群名已存在",
      }
    }
    const group = await ctx.model.Group.create(groupData)
    console.log(group, "group")
    // 添加成员到群
    const usersdata = data.users.split(",")
    usersdata.unshift(data.userId)
    const userData = usersdata.map((user) => {
      return {
        groupId: group._id,
        userId: user,
        time: ctx.helper.moment().unix(),
        lastTime: ctx.helper.moment().unix(),
      }
    })
    this.addGroupUser(userData)

    return {
      code: 0,
      msg: "新建成功",
    }
  }

  // 添加群成员
  addGroupUser(data) {
    const { ctx } = this
    data.forEach(async (item) => {
      await ctx.model.GroupUser.create(item)
    })
    return {
      code: 0,
      msg: "添加成功",
    }
  }
}

module.exports = GroupService
