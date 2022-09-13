<template>
	<view class="container">
		<view class="header">
			<u-navbar :title="title" :autoBack="true" fixed border @leftClick="goBack"></u-navbar>
		</view>
		<scroll-view scroll-y class="chat" scroll-with-animation>
			<view class="chat-main">
				<view class="chat-ls" v-for="(item, index) in msgs" :key="index">
					<view class="chat-time">{{ (item.time / 1000) | formatTime }}</view>
					<view class="msg-m msg-left" v-if="item.userId != 'b'">
						<image :src="item.imgurl" mode="" class="user-img"></image>
						<view class="message" v-if="item.types == 0">
							<view class="msg-text">{{ item.message }}</view>
						</view>
						<view class="message" v-if="item.types == 1">
							<image :src="item.message" mode="widthFix" class="msg-img"></image>
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.userId != 'a'">
						<image :src="item.imgurl" mode="" class="user-img"></image>
						<view class="message" v-if="item.types == 0">
							<view class="msg-text">{{ item.message }}</view>
						</view>
						<view class="message" v-if="item.types == 1">
							<image :src="item.message" mode="widthFix" class="msg-img"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="footer">
			<view class="top">
				<view class="iconfont icon-send_sound sound"></view>
				<u--input
					border="surround"
					v-model="messageValue"
					@change="change"
					:customStyle="styleObj"
				></u--input>
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
import dayjs from 'dayjs'
import datas from '@/utils/data.js'
export default {
	data() {
		return {
			title: '',
			messageValue: '', //发送的信息
			styleObj: {
				marginRight: '8px',
				height: '18px',
				margin: '5px 8px 5px 0'
			},
			msgs: [] //消息列表
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
		getMsg() {
			let msg = datas()
			for (let i = 0; i < msg.length; i++) {
				msg[i].imgurl = '../../static/images/' + msg[i].imgurl
				if (msg[i].types == 1) {
					msg[i].message = '../../static/images/' + msg[i].message
				}
				this.msgs.unshift(msg[i])
			}
			console.log(this.msgs, 'msgs')
		}
	},

	onLoad() {
		this.getMsg()
	}
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
					.msg-img {
						max-width: 200px;
						border-radius: 10px;
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
					.msg-img {
						margin-left: 8px;
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
					.msg-img {
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
