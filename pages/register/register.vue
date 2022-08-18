<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-right">
				<text @click="goBack">
					<</text>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/images/火.png" alt="">
		</view>
		<view class="main">
			<view class="title">
				注册
			</view>
			<view class="sub-title">
				您好，欢迎注册e_chat!
			</view>
			<view class="login">
				<uni-forms ref="form" :modelValue="formData" :rules="rules">
					<uni-forms-item name="userName" label="用户名">
						<uni-easyinput type="text" v-model="formData.userName" placeholder="请输入用户名" />
					</uni-forms-item>
					<uni-forms-item name="email" label="邮箱">
						<uni-easyinput type="text" v-model="formData.email" placeholder="请输入邮箱" />
					</uni-forms-item>
					<uni-forms-item name="password" label="密码">
						<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="btn-login">
				<button @click="submit">注册</button>
			</view>
		</view>
		<uni-popup ref="message" type="message" style='text-align: center;'>
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {
		loginReq,
		registerReq
	} from '../../api/index.js'
	export default {
		data() {
			return {
				msgType:'success',
				messageText:'注册成功',
				// 表单数据
				formData: {
					userName: '',
					email: '',
					password: ''
				},
				rules: {
					userName: {
						rules: [{
								required: true,
								errorMessage: '请输入用户名'
							},
							{
								minLength: 3,
								maxLength: 10,
								errorMessage: '账号长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					email: {
						rules: [{
								required: true,
								errorMessage: '请输入邮箱'
							},
							{
								format: 'email',
								errorMessage: '请输入正确的邮箱地址'
							}
						]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入密码'
						}, {
							validateFunction(rule, value, data, callback) {
								const reg = /^\w+$/
								if (!reg.test(value)) {
									callback('密码只能由英文、数字、下划线组成')
								}
								return true
							}
						}]
					}
				}
			};
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			submit() {
				this.$refs.form.validate().then(async (res) => {
					console.log('表单数据信息：', res);
					const postData = {
						username: res.userName,
						email: res.email,
						password: res.password
					}
					const result = await registerReq(postData)
					if(result.code===0){
							this.$refs.message.open()
							setTimeout(()=> {
								uni.navigateTo({
									url:'/pages/login/login'
								})
							}, 2000);
					}else{
						this.msgType='error'
						this.messageText=result.msg
						this.$refs.message.open()
					}
					
					/* if(result.code === 0){
						localStorage.setItem('token',result.data.token)
						localStorage.setItem('username',result.data.userName)
					} */
					console.log('result', result)
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		},
	}
</script>

<style lang="scss">
	.top-bar {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-top: var(--status-bar-height);
		width: 100%;
		height: 44px;
		background: #FFFFFF;
		box-shadow: 0px 0.5px 0px 0px rgba(0, 0, 0, 0.1);

		.top-bar-right {
			display: flex;
			align-items: center;
			width: 60px;
			height: 26px;
			padding: 0 10px;

			text {
				font-family: PingFangSC-Medium;
				font-size: 28px;
				color: #333333;
				letter-spacing: 0;
				font-weight: 500;
			}
		}
	}

	.logo {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100px;
		margin-top: 30px;

		image {
			width: 96px;
			height: 45.82px;
		}
	}

	.main {
		padding: 0 25px;

		.title {
			font-family: PingFangSC-Medium;
			font-size: 28px;
			color: #272832;
			letter-spacing: 0;
			font-weight: 500;
			margin-bottom: 10px;
		}

		.sub-title {
			font-family: PingFangSC-Regular;
			font-size: 20px;
			color: rgba(39, 40, 50, 0.50);
			letter-spacing: 0;
			font-weight: 400;
			margin-bottom: 30px;
		}

		.btn-login {
			width: 100%;
			height: 48px;
			background: #FFE431;
			border-radius: 24px;
			margin: 60px 0;

			button {
				width: 100%;
				height: 100%;
				border-radius: 24px;
				background: #FFE431;
			}
		}
	}
</style>
