"use strict"

const Controller = require("egg").Controller

class GroupController extends Controller {
  // 搜索群
  async searchGroup() {
    const { ctx } = this
    const data = ctx.request.body
    const res = await ctx.service.group.searchGroup(data)
    console.log("res", res)
    ctx.helper.success({
      ctx,
      res,
    })
  }
  // 是否在群内
  async isInGroup() {
    const { ctx } = this
    const data = ctx.request.body
    const res = await ctx.service.group.isInGroup(data)
    console.log("res", res)
    ctx.helper.success({
      ctx,
      res,
    })
  }
  // 按要求获取群列表
  async getGroupList() {
    const { ctx } = this
    const data = ctx.request.body
    const res = await ctx.service.group.getGroupList(data)
    console.log("res", res)
    ctx.helper.success({
      ctx,
      res,
    })
  }
  // 按要求获取群消息列表
  async getMessageList() {
    const { ctx } = this
    const data = ctx.request.body
    const res = await ctx.service.group.getMessageList(data)
    console.log("res", res)
    ctx.helper.success({
      ctx,
      res,
    })
  }
  // 修改消息状态
  async updateMsgState() {
    const { ctx } = this
    const data = ctx.request.body
    const res = await ctx.service.group.updateMsgState(data)
    console.log("res", res)
    ctx.helper.success({
      ctx,
      res,
    })
  }
  // 创建群
  async createGroup() {
    const { ctx } = this
    const data = ctx.request.body
    const res = await ctx.service.group.createGroup(data)
    console.log("res", res)
    ctx.helper.success({
      ctx,
      res,
    })
  }
}

module.exports = GroupController
