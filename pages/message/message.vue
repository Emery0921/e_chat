<template>
	<view class="container">
		<view class="header"><u-navbar :title="title" :autoBack="true" fixed border @leftClick="goBack"></u-navbar></view>
		<scroll-view scroll-y class="chat" scroll-with-animation>
			<view class="chat-main">
				<view class="chat-ls">
					<view class="chat-time">10:00</view>
					<view class="msg-m msg-left">
						<image src="../../server/app/public/emery/1655262869261.jpg" mode="" class="user-img"></image>
						<view class="message"><view class="msg-text">你</view></view>
					</view>
				</view>
				<view class="chat-ls">
					<view class="chat-time">10:00</view>
					<view class="msg-m msg-right">
						<image src="../../server/app/public/emery/1655262869261.jpg" mode="" class="user-img"></image>
						<view class="message"><view class="msg-text">11111111111111111111111111111111111</view></view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="footer">
			<view class="top">
				<view class="iconfont icon-send_sound sound"></view>
				<u--input border="surround" v-model="messageValue" @change="change" :customStyle="styleObj"></u--input>
				<view class="iconfont icon-xiaolian smile"></view>
				<u-icon name="plus-circle" size="25"></u-icon>
			</view>
			<view class="bottom">
				<view class="item"><view class="iconfont icon-xiangce"></view></view>
				<view class="item"><view class="iconfont icon-paishexuanzhong"></view></view>
				<view class="item"><view class="iconfont icon-shipintonghua"></view></view>
				<view class="item"><view class="iconfont icon-weizhi"></view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			messageValue: '', //发送的信息
			styleObj: {
				marginRight: '8px',
				height: '18px',
				margin: '5px 8px 5px 0'
			}
		}
	},

	methods: {
		//返回上一层
		goBack() {
			uni.navigateBack({
				delta: -1
			})
		},
		change(e) {
			console.log('change', e)
		},
		// 获取聊天信息
		getMsg() {}
	},
	onLoad() {}
}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	.footer {
		width: 100%;
		position: fixed;
		bottom: 0;
		.top {
			display: flex;
			border: 2px solid #f1f3f4;
			.sound {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.smile {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.u-icon {
				margin-right: 8px;
			}
		}
		.bottom {
			width: 100%;
			height: 250px;
			display: flex;
			justify-content: space-around;
			align-items: flex-start;
			background-color: #f0f2f5;
			.item {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 50px;
				height: 50px;
				border-radius: 12px;
				background-color: #ffffff;
				margin-top: 40px;
			}
		}
	}
	.chat {
		height: 100%;
		.chat-main {
			padding: 100px 10px;
			display: flex;
			flex-direction: column;
			.chat-ls {
				.chat-time {
					font-size: 12px;
					color: rgba(39, 40, 50, 0.3);
					line-height: 34rpx;
					padding: 20px 0;
					text-align: center;
				}
				.msg-m {
					display: flex;
					padding: 10px 0;
					.user-img {
						width: 40px;
						height: 40px;
						border-radius: 10px;
					}
					.message {
						max-width: 240px;
						position: relative;
						.msg-text {
							font-size: 16px;
							color: rgba(39, 40, 50, 1);
							line-height: 22px;
							padding: 8px 12px;
						}
					}
				}
				.msg-left {
					.msg-text {
						background-color: #f0f2f5;
						border-radius: 0 20px 20px 20px;
						margin-left: 8px;
						word-break: break-all;
						word-wrap: break-word;
					}
					.message::before {
						content: '';
						width: 0;
						height: 0;
						border-top: 10px solid transparent;
						border-bottom: 10px solid transparent;
						border-right: 10px solid #f0f2f5;
						position: absolute;
						transform: translateY(50%);
					}
				}
				.msg-right {
					flex-direction: row-reverse;
					.msg-text {
						word-break: break-all;
						word-wrap: break-word;
						background-color: #f0f2f5;
						border-radius: 20px 0px 20px 20px;
						margin-right: 8px;
					}

					.message::after {
						content: '';
						width: 0;
						height: 0;
						border-top: 10px solid transparent;
						border-bottom: 10px solid transparent;
						border-left: 10px solid #f0f2f5;
						position: absolute;
						top: 0;
						right: 0;
						transform: translateY(50%);
					}
				}
			}
		}
	}
}
</style>
