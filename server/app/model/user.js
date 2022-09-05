module.exports = (app) => {
	const mongoose = app.mongoose
	const Schema = mongoose.Schema
	const UserSchema = new Schema({
		sex: {
			type: "string",
		},
		imgUrl: {
			type: "string",
			default: "user.png",
			//默认头像
		},
		address: {
			//地区
			type: "string",
			default: "",
		},
		nickName: {
			//备注
			type: "string",
			default: "",
		},
		birth: {
			type: "string",
			default: null,
		},
		phone: {
			type: "string",
			default: null,
		},
		desc: {
			type: "string",
			default: "",
		},
		userName: {
			type: "string",
			min: 2,
			max: 10,
			match: /^(?:[\u4e00-\u9fa5A-Za-z0-9_]{2,10})$/,
		},
		password: {
			type: "string",
		},
		email: {
			type: "string",
			match: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
		},
		registerTime: {
			type: "number",
			default: 0,
		},
	}, {
		collection: "user",
		versionKey: false,
	})
	const User = mongoose.model("User", UserSchema)
	/*  const loginUser = {
	  userName:'emery',
	  password:'990921',
	  email:'927987860@qq.com',
	  sex:'male',
	  imgUrl:require('../public/images/avatar.jpg')
	}
	const oldUser = await User.find({
	  email:loginUser.eamil
	})
	if(oldUser.length===0){
	  await User.create(loginUser)
	} */
	return User
}
