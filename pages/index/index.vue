<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/avatar.jpg" mode=""></image>
			</view>
			<view class="top-bar-center">
				<image src="../../static/images/logo.png" mode=""></image>
			</view>
			<view class="top-bar-right">
				<image src="../../static/images/search@2x.png" mode=""></image>
				<image src="../../static/images/add@2x.png" mode=""></image>
			</view>
		</view>
		<view class="apply">
			<view class="avatar">
				<view class=" iconfont icon-tianjiahaoyou">	
				<text class="tip">1</text>
				</view>
			</view>
			<view class="message">
				<view class="message-top">
					好友申请
					<span>上午11:00</span>
				</view>
				<view class="message-bottom">
					请求添加好友
				</view>
			</view>
		</view>
		<view class="apply" v-for="friend in friendList" :key="friend.id">
			<view class="avatar">
				<text class="tip">1</text>
				<image style="width: 100%;height: 100%;border-radius: 12px;" src="../../static/images/avatar.jpg" mode=""></image>
			</view>
			<view class="message">
				<view class="message-top">
					{{friend.userName}}
					<span>{{friend.lastTime | formatTime}}</span>
				</view>
				<view class="message-bottom">
					what are you doingwhat are you doingwhat are you doingwhat are you doing
				</view>
			</view>
			
		</view>
		<uni-popup ref="message" type="message" style='text-align: center;'>
			<uni-popup-message type="error" message="请登录" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {getFriendListReq} from '../../api/index.js'
	export default {
		data() {
			return {
				friendList:[],
				userId: '62970b1a2217423e504627df'
			}
		},
		onLoad() {
			// const token  = localStorage.getItem('token')
			// if(!token){
			// 	console.log(this.$refs)
			// 	// return 
			// 	// this.$refs.message.open()
			// 	setTimeout(()=> {
			// 		uni.navigateTo({
			// 			url:'/pages/login/login'
			// 		})
			// 	}, 2000);
			// }
			this.getFriendList()
		},
		methods: {
			// 获取好友列表
			async getFriendList(){
				const postData = {
					userId:this.userId,
					state:'0'
				}
				const res  = await getFriendListReq(postData)
				console.log('res',res)
				if(res.code===0){
					this.friendList = res.data
				}
				
			}
		}
	}
</script>

<style lang='scss'>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0 15px;
	}
	.top-bar{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--status-bar-height);
		width: 100%;
		height: 44px;
		background: #FFFFFF;
		box-shadow: 0px 0.5px 0px 0px rgba(0,0,0,0.1);
		.top-bar-left{
			width: 34px;
			height: 34px;
			border-radius: 8px;
			image{
				width: 100%;
				height: 100%;
				background: #FFFFFF;
			}
		}
		.top-bar-center{
			width: 44px;
			height: 21px;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.top-bar-right{
			display: flex;
			justify-content: space-between;
			width: 60px;
			height: 26px;
			image{
				width: 26px;
				height: 26px;
				background: #FFFFFF;
			}
		}
	}
	.apply{
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-top: 10px;
		&:active{
			background-color: beige;
		}
		.avatar{
			width: 48px;
			height: 48px;
			background: #FFE431;
			border-radius: 12px;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			.tip{
				display: inline-block;
				width: 16px;
				height: 16px;
				position: absolute;
				top: -2px;
				right: -2px;
				font-size: 10px;
				background: #FF5D5B;
				border-radius: 50%;
				z-index: 999;
				text-align: center;
			}
		}
		.message{
			display: flex;
			flex-direction: column;
			flex: 1;
			margin-left: 15px;
			.message-top{
				display: flex;
				justify-content: space-between;
				font-family: PingFangSC-Regular;
				font-size: 18px;
				color: #272832;
				letter-spacing: -0.62px;
				font-weight: 400;
				span{
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(39,40,50,0.40);
					letter-spacing: -0.41px;
					font-weight: 400;
				}
			}
			.message-bottom{
				height: 20px;
				width:100%;
				font-family: PingFangSC-Regular;
				font-size: 16px;
				color: rgba(39,40,50,0.60);
				letter-spacing: -0.48px;
				font-weight: 400;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			
		}
	}

</style>
