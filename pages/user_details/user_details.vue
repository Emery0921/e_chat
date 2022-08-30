<template>
	<view class="container">
		<view class="top-bar">
			<view class="top-bar-right">
				<text @click="goBack">
					<</text>
			</view>
			<view class="top-bar-left">
				<image src="../../static/images/more.png" mode=""></image>
			</view>
		</view>
		<view class="header">
			<image src="../../server/app/public/emery/1655262869261.jpg" mode=""></image>
			<view class="header-right">
				<view class="nickname">
					<h3>{{userInfo.nickName?userInfo.nickName:userInfo.userName}}</h3>
					<view class="iconfont icon-xingbienan"></view>
					<view class="iconfont icon-bianji" @click="editName"></view>
				</view>
				<view class="userinfo">
					<view>昵称：{{userInfo.userName}}</view>
					<view>邮箱：{{userInfo.email}}</view>
					<view v-if="userInfo.address">地区：{{userInfo.address}}</view>
					<view class="signature">个性签名：{{userInfo.desc?userInfo.desc:'这个人很懒，没有个性签名'}}</view>
				</view>
			</view>

		</view>
		<view class="personal-tags">
			<h4>个性标签</h4>
			<uni-tag :inverted="true" text="标签" type="primary" class='tags' />
			<uni-tag :inverted="true" text="标签" type="primary" class='tags' />
			<uni-tag :inverted="true" text="标签" type="primary" class='tags' />
		</view>
		<view class="btn">
			加为好友
		</view>
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="请输入备注" v-model="userInfo.nickName" placeholder="请输入内容"
				@confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="message" type="message" style='text-align: center;'>
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {getUserDetailsReq} from '../../api/index.js'
	export default {
		data() {
			return {
				msgType:'success',
				messageText:'修改成功',
				userId:'',//用户id
				userInfo:{},//用户信息
			}
		},
		onLoad(option) {
			console.log('option',option)
			this.userId = option.userId
			this.getUserDetails()
		},
		methods: {
			editName() {//修改备注
				console.log(123)
				this.$refs.inputDialog.open()
			},
			// 获取用户详细信息
			async getUserDetails(){
				const res = await getUserDetailsReq(this.userId)
				// console.log('res',res)
				const {code,data} = res
				if(code===0){
					this.userInfo =data
				}
			},
			goBack(){//返回上一层
				uni.navigateBack({
					delta: 1
				});
			},
			dialogInputConfirm(val) {//确认备注
				uni.showLoading({
					title: '修改中'
				})
				setTimeout(() => {
					if(val.length>6){
						this.msgType = 'error',
						this.messageText = '备注不能超过6位，请重新输入'
						this.$refs.message.open()
						uni.hideLoading()
						this.$refs.inputDialog.open()
						return
					}
					
					console.log(val)
					this.userInfo.nickName = val
					uni.hideLoading()
					// 关闭窗口后，恢复默认内容
					this.$refs.inputDialog.close()
					this.$refs.message.open()
				}, 2000)
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
		height: 100%;
		background: #e2e0df;

		.top-bar {
			display: flex;
			justify-content: space-between;
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

			.top-bar-left {
				width: 26px;
				height: 6px;
				text-align: center;
				line-height: 6px;
				padding: 0 10px;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.header {
			position: relative;
			display: flex;
			width: 100%;
			height: 200px;
			padding: 20px 10px;
			background-color: #f5f5f5;
			box-sizing: border-box;

			image {
				width: 60px;
				height: 60px;
				border-radius: 10px;
				margin-right: 20px;
			}

			.header-right {
				display: flex;
				flex-direction: column;
				flex: 1;

				.nickname {
					display: flex;
					align-items: center;
					margin-bottom: 10px;
				}

				.userinfo {
					font-size: 15px;

					view {
						margin-bottom: 8px;
						color: #272832;
					}

					.signature {
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
			}
		}

		.header::after {
			content: '';
			width: 95%;
			height: 1px;
			position: absolute;
			bottom: 0;
			background-color: gray;
			opacity: 0.5;
		}

		.personal-tags {
			background-color: #f5f5f5;
			width: 100%;
			padding: 20px 10px;
			box-sizing: border-box;
			position: relative;

			h4 {
				margin-bottom: 15px;
			}

			.tags {
				margin-right: 10px;
			}
		}

		.btn {
			background-color: #f5f5f5;
			width: 100%;
			height: 50px;
			color: blue;
			margin-top: 10px;
			font-size: 20px;
			text-align: center;
			line-height: 50px;
		}
	}
</style>
