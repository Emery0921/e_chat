<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-right">
				<text  @click="register">注册</text>
			</view>
		</view>
		<view class="logo">
			<image src="../../static/images/火.png" alt="">
		</view>
		<view class="main">
			<view class="title">
				登录
			</view>
			<view class="sub-title">
				您好，欢迎来到e_chat!
			</view>
			<view class="login">
				<uni-forms ref="form" :modelValue="formData" :rules="rules">
					<uni-forms-item name="username" label="用户名/邮箱">
						<uni-easyinput type="text" v-model="formData.username" placeholder="请输入用户名/邮箱" />
					</uni-forms-item>
					<uni-forms-item name="password" label="密码">
						<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="forget-password" @click="goForPassPage">
				忘记密码
			</view>
			<view class="btn-login">
				<button @click="submit">登录</button>
			</view>
			<uni-popup ref="message" type="message" style='text-align: center;'>
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {loginReq} from '../../api/index.js'
	export default {
		data() {
			return {
				msgType:'success',
				messageText:'登录成功',
				// 表单数据
				formData: {
					username: '',
					password: ''
				},
				rules: {
					username: {
						rules: [{
							minLength: 3,
							maxLength: 20,
							errorMessage: '账号长度在 {minLength} 到 {maxLength} 个字符',
						}]
					},
					password: {
						rules: [{
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
			submit() {
				this.$refs.form.validate().then(async (res) => {
					console.log('表单数据信息：', res);
					const postData = {
						username:res.username,
						password:res.password
					}
					const result = await loginReq(postData)
					if(result.code === 0){
						localStorage.setItem('token',result.data.token)
						localStorage.setItem('username',result.data.userName)
						this.$refs.message.open()
						setTimeout(()=> {
							uni.navigateTo({
								url:'/pages/index/index'
							})
						}, 2000);
					}else{
						this.msgType='error'
						this.messageText=result.msg
						this.$refs.message.open()
					}
					console.log('result',result)
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
			// 跳转到注册页面
			register(){
				console.log(1234)
				uni.navigateTo({
					url:'/pages/register/register'
				});
			},
			// 跳转到修改密码页面
			goForPassPage(){
				uni.navigateTo({
					url:'/pages/forget_password/forget_password'
				})
			}
		},
	}
</script>

<style lang="scss">
	.top-bar {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-top: var(--status-bar-height);
		width: 100%;
		height: 44px;
		background: #FFFFFF;
		box-shadow: 0px 0.5px 0px 0px rgba(0, 0, 0, 0.1);

		.top-bar-right {
			display: flex;
			justify-content: space-between;
			width: 60px;
			height: 26px;

			image {
				width: 26px;
				height: 26px;
				background: #FFFFFF;
			}

			text {
				width: 36px;
				height: 25px;
				font-family: PingFangSC-Medium;
				font-size: 18px;
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
		.forget-password{
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.btn-login{
			width: 100%;
			height: 48px;
			background: #FFE431;
			border-radius: 24px;
			margin: 30px 0;
			button{
				width: 100%;
				height: 100%;
				border-radius: 24px;
				background: #FFE431;
			}
		}
	}
</style>
