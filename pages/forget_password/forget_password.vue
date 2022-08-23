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
		<view class="main" v-if="1">
			<view class="title">
				找回密码
			</view>
			<view class="sub-title">
				请输入注册邮箱获取验证码
			</view>
			<view class="login">
				<uni-forms ref="form" :modelValue="formData" :rules="rules">
					<uni-forms-item name="email" label="邮箱">
						<uni-easyinput type="text" v-model="formData.email" placeholder="请输入邮箱" />
					</uni-forms-item>
					<uni-forms-item name="captcha" label="验证码">
						<uni-easyinput type="text" v-model="formData.captcha" placeholder="请输入验证码" />
						<button @click="getCaptcha" class="get-captcha" :style="isSend">{{btnMessage}}</button>
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="btn-login">
				<button @click="submit">重置密码</button>
			</view>
		</view>
		<view class="main" v-else>
			<view class="title">
				找回密码
			</view>
			<view class="sub-title">
				请重新设置密码
			</view>
			<uni-forms ref="form" :modelValue="formData" :rules="rules" label-width='80px' label-align='right'>
				<uni-forms-item name="password1" label="密码">
					<uni-easyinput type="password" v-model="formData.password1" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item name="password2" label="确认密码">
					<uni-easyinput type="password" v-model="formData.password2" placeholder="请再次输入密码" />
				</uni-forms-item>
			</uni-forms>
			<view class="btn-login">
				<button @click="confirm">确认</button>
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
				msgType: 'success',
				messageText: '修改成功',
				btnMessage: '获取验证码',
				second: 60,
				timer: null, //定时器标志
				isSend: {
					backgroundColor: ''
				},
				// 表单数据
				formData: {
					email: '',
					captcha: '',
					password1:"",
					password2:''
				},
				rules: {
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
					captcha: {
						rules: [{
							required: true,
							errorMessage: '请输入验证码'
						}]
					},
					password1: {
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
					},
					password2: {
						rules: [{
							required: true,
							errorMessage: '请再次输入密码'
						}, {
							validateFunction(rule, value, data, callback) {
								// console.log(value,data)
								const reg = /^\w+$/
								if (!reg.test(value)) {
									callback('密码只能由英文、数字、下划线组成')
								}
								if(data.password1!==data.password2){
									callback('密码不一致')
								}
								return true
							}
						}]
					}
				}
			};
		},
		methods: {
			goBack() {
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
					if (result.code === 0) {
						this.$refs.message.open()
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}, 2000);
					} else {
						this.msgType = 'error'
						this.messageText = result.msg
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
			},
			// 获取验证码
			getCaptcha() {
				if (this.second !== 60) {
					return
				}
				this.timer = setInterval(() => {
					this.isSend.backgroundColor = '#D4D4D6'
					this.btnMessage = `${this.second}s后重新发送`
					this.second--
					if (this.second < 0) {
						this.btnMessage = '获取验证码'
						this.isSend.backgroundColor = ''
						clearInterval(this.timer)
						this.second = 60
					}
				}, 1000)
			},
			// 确认修改密码
			confirm(){
				this.$refs.form.validate().then(async (res) => {
					console.log('表单数据信息：', res);
					return
					const postData = {
						username: res.userName,
						email: res.email,
						password: res.password
					}
					const result = await registerReq(postData)
					if (result.code === 0) {
						this.$refs.message.open()
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}, 2000);
					} else {
						this.msgType = 'error'
						this.messageText = result.msg
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

		.get-captcha {
			height: 35px;
			border-radius: 12px;
			margin-left: 5px;
			line-height: 35px;
			background: #FFE431;
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
