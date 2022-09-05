"use strict"

const Controller = require("egg").Controller

class UserController extends Controller {
	createRule = {
		sex: {
			type: "string",
			default: "男",
			required: false,
		},
		imgUrl: {
			type: "string",
			required: false,
		},
		userName: {
			type: "string",
			min: 2,
			max: 10,
			rule: /^(?:[\u4e00-\u9fa5A-Za-z0-9_]{2,10})$/,
		},
		password: {
			type: "string",
		},
		email: {
			type: "string",
			match: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
		},
	}
	userNameLoginRule = {
		userInfo: {
			type: "string",
			min: 2,
			max: 10,
			rule: /^(?:[\u4e00-\u9fa5A-Za-z0-9_]{2,10})$/,
		},
		password: {
			type: "string",
		},
	}
	emailLoginRule = {
		userInfo: {
			type: "string",
			match: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
		},
		password: {
			type: "string",
		},
	}
	// 登录
	async login() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		console.log(data, "data")
		const index = data.userInfo.search("@")
		index === -1 ?
			ctx.validate(this.userNameLoginRule, data) :
			ctx.validate(this.emailLoginRule, data)
		const res = await ctx.service.user.login(data)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	// 注册
	async register() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		console.log("data", data)
		ctx.validate(this.createRule, data)
		const res = await ctx.service.user.createUser(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	//邮箱验证
	async email() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		const res = await ctx.service.user.email(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	// 搜索用户
	async searchUser() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		const res = await ctx.service.user.searchUser(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	// 搜索群
	async searchGroup() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		const res = await ctx.service.user.searchGroup(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	// 是否为好友
	async isFriend() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		const res = await ctx.service.user.isFriend(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	// 用户详情
	async userDetail() {
		const {
			ctx
		} = this
		const {
			id
		} = ctx.query
		const res = await ctx.service.user.userDetail(id)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	// 用户详情修改
	async userDetailUpdate() {
		const {
			ctx
		} = this
		const {
			id
		} = ctx.params
		const data = ctx.request.body
		const res = await ctx.service.user.userDetailUpdate({
			...data,
			id
		})
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	// 用户密码修改
	async userPwdUpdate() {
		const {
			ctx
		} = this
		const {
			id
		} = ctx.params
		const data = ctx.request.body
		const res = await ctx.service.user.userPwdUpdate({
			...data,
			id
		})
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	// 获取好友备注
	async getFriendNickname() {
		const {
			ctx
		} = this
		const {
			userId,
			friendId
		} = ctx.params
		const res = await ctx.service.user.getFriendNickname({
			userId,
			friendId,
		})
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	// 修改好友备注
	async updateFriendNickname() {
		const {
			ctx
		} = this
		const {
			userId,
			friendId
		} = ctx.params
		const data = ctx.request.body
		const res = await ctx.service.user.updateFriendNickname({
			...data,
			userId,
			friendId,
		})
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	// 好友申请
	async applyFriend() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		ctx.validate({
				userId: {
					type: "string",
					required: true,
				},
				friendId: {
					type: "string",
					required: true,
				},
			},
			data
		)
		const res = await ctx.service.user.applyFriend(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	// 更新好友状态
	async updateFriendState() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		const res = await ctx.service.user.updateFriendState(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	// 拒绝好友或者删除好友
	async deleteFriend() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		ctx.validate({
				userId: {
					type: "string",
					required: true,
				},
				friendId: {
					type: "string",
					required: true,
				},
			},
			data
		)
		const res = await ctx.service.user.deleteFriend(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	//按要求获取用户列表
	async getUserList() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		ctx.validate({
				userId: {
					type: "string",
					required: true,
				},
				state: {
					type: "string",
					required: true,
				},
			},
			data
		)
		const res = await ctx.service.user.getUserList(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	//按要求获取一对一消息列表
	async getMessageList() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		ctx.validate({
				userId: {
					type: "string",
					required: true,
				},
				friendId: {
					type: "string",
					required: true,
				},
			},
			data
		)
		const res = await ctx.service.user.getMessageList(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	//未读消息
	async unreadMsg() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		ctx.validate({
				userId: {
					type: "string",
					required: true,
				},
				friendId: {
					type: "string",
					required: true,
				},
			},
			data
		)
		const res = await ctx.service.user.unreadMsg(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	//修改消息状态
	async updateMsgState() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		ctx.validate({
				userId: {
					type: "string",
					required: true,
				},
				friendId: {
					type: "string",
					required: true,
				},
			},
			data
		)
		const res = await ctx.service.user.updateMsgState(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
	//分页获取消息数据
	async getMsgByPage() {
		const {
			ctx
		} = this
		const data = ctx.request.body
		ctx.validate({
				userId: {
					type: "string",
					required: true,
				},
				friendId: {
					type: "string",
					required: true,
				},
				page: {
					type: "number",
					required: true,
				},
				pageSize: {
					type: "number",
					required: true,
				},
			},
			data
		)
		const res = await ctx.service.user.getMsgByPage(data)
		console.log("res", res)
		ctx.helper.success({
			ctx,
			res,
		})
	}
}

module.exports = UserController
