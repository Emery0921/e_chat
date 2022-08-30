<template>
	<view class="container">
		<view class="header"><u-navbar title="个人中心" @leftClick="leftClick" :autoBack="true" fixed border></u-navbar></view>
		<view class="main">
			<u--form labelPosition="left" :model="formData" :rules="rules" ref="form1">
				<u-navbar @leftClick="leftClick" :autoBack="true" rightIcon="arrow-right" border class="bar">
					<view class="u-nav-slot" slot="left">头像</view>
					<view class="u-nav-slot" slot="center">
						<u-avatar src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg" shape="square"></u-avatar>
					</view>
				</u-navbar>
				<u-navbar @leftClick="leftClick" :autoBack="true" rightIcon="arrow-right" border class="bar">
					<view class="u-nav-slot" slot="left">签名</view>
					<!-- <view class="u-nav-slot" slot="center">{{ userCenterInfo.desc || '这个人很懒，没有个性签名' }}</view> -->
				</u-navbar>
				<u-navbar @leftClick="leftClick" :autoBack="true" rightIcon="arrow-right" border class="bar">
					<view class="u-nav-slot" slot="left">注册</view>
					<!-- <view class="u-nav-slot" slot="center">{{ userCenterInfo.registerTime | formatTime }}</view> -->
				</u-navbar>
				<u-navbar @leftClick="leftClick" :autoBack="true" rightIcon="arrow-right" border class="bar">
					<view class="u-nav-slot" slot="left">昵称</view>
					<!-- <view class="u-nav-slot" slot="center">{{ userCenterInfo.userName }}</view> -->
				</u-navbar>
				<u-form-item label="性别" prop="userCenterInfo.sex" borderBottom @click="showSex = true">
					<u--input
						v-model="formData.userCenterInfo.sex"
						disabled
						disabledColor="#ffffff"
						placeholder="请选择性别"
						border="none"
					></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="生日" borderBottom @click="showBirth = true">
					<u--input
						v-model="formData.userCenterInfo.birth"
						disabled
						disabledColor="#ffffff"
						placeholder="请选择生日"
						border="none"
					></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-navbar @leftClick="leftClick" :autoBack="true" rightIcon="arrow-right" border class="bar">
					<view class="u-nav-slot" slot="left">电话</view>
					<!-- <view class="u-nav-slot" slot="center">{{ userCenterInfo.phone }}</view> -->
				</u-navbar>
				<u-navbar @leftClick="leftClick" :autoBack="true" rightIcon="arrow-right" border class="bar">
					<view class="u-nav-slot" slot="left">邮箱</view>
					<!-- <view class="u-nav-slot" slot="center">{{ userCenterInfo.email }}</view> -->
				</u-navbar>
				<u-navbar @leftClick="leftClick" :autoBack="true" rightIcon="arrow-right" border class="bar">
					<view class="u-nav-slot" slot="left">地区</view>
					<!-- <view class="u-nav-slot" slot="center">{{ userCenterInfo.address }}</view> -->
				</u-navbar>
				<u-navbar @leftClick="leftClick" :autoBack="true" rightIcon="arrow-right" border class="bar">
					<view class="u-nav-slot" slot="left">密码</view>
					<!-- <view class="u-nav-slot" slot="center">{{ userCenterInfo.password }}</view> -->
				</u-navbar>
			</u--form>
		</view>

		<u-action-sheet :show="showSex" :actions="actionsSex" title="请选择性别" @close="showSex = false" @select="sexSelect"></u-action-sheet>
		<u-datetime-picker
			ref="datetimePicker"
			:formatter="formatter"
			:show="showBirth"
			v-model="value1"
			mode="date"
			@confirm="birthSelect"
			@cancel="showBirth = false"
			:minDate="0"
			:maxDate="new Date().getTime()"
		></u-datetime-picker>
	</view>
</template>

<script>
import dayjs from 'dayjs'
import { getUserDetailsReq } from '../../api/index.js'
export default {
	data() {
		return {
			formData: {
				userCenterInfo: {}
			},
			value1: '',
			showSex: false, //展示性别修改框
			showBirth: false, //展示生日修改框
			rules: {
				'userCenterInfo.sex': {
					type: 'string',
					max: 1,
					required: true,
					message: '请选择男或女',
					trigger: ['blur', 'change']
				}
			},
			actionsSex: [
				{
					name: '男'
				},
				{
					name: '女'
				}
			]
		}
	},
	onLoad() {
		this.formData.userCenterInfo = JSON.parse(localStorage.getItem('userInfo'))
		if (this.formData.userCenterInfo.sex === 'male') {
			this.formData.userCenterInfo.sex = '男'
		} else {
			this.formData.userCenterInfo.sex = '女'
		}
		console.log(this.formData.userCenterInfo, 123)
	},
	onReady() {
		// 微信小程序需要用此写法
		this.$refs.datetimePicker.setFormatter(this.formatter)
	},
	methods: {
		leftClick() {
			uni.navigateBack({
				delta: 1
			})
		},
		// 获取用户详细信息
		async getUserDetails() {
			const res = await getUserDetailsReq(this.userId)
			// console.log('res',res)
			const { code, data } = res
			if (code === 0) {
				this.userInfo = data
			}
		},
		sexSelect(e) {
			this.formData.userCenterInfo.sex = e.name
			this.$refs.form1.validateField('userInfo.sex')
		},
		birthSelect(e) {
			this.showBirth = false
			this.formatTime()
			this.formData.userCenterInfo.birth = dayjs(e.value).format('YYYY-MM-DD')
		},
		// 格式化日期
		formatter(type, value) {
			if (type === 'year') {
				return `${value}年`
			}
			if (type === 'month') {
				return `${value}月`
			}
			if (type === 'day') {
				return `${value}日`
			}
			return value
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	.header {
		width: 100%;
		height: 45px;
	}

	.main {
		width: 100%;
		height: 45px;

		/deep/ uni-view .u-navbar--fixed {
			position: static;
		}

		/deep/ .u-nav-slot {
			width: 280px;
		}
		/deep/.u-form-item__body__left__content__label {
			font-size: 16px;
		}
		/deep/ .u-form-item {
			padding: 0 20px;
		}
		.bar {
			margin-bottom: 10px;
		}
	}
}
</style>
