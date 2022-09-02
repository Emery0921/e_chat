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
				<u-form-item label="签名" borderBottom @click="showSignature = true">
					<u--input
						v-model="formData.userCenterInfo.desc || '这个人很懒，没有个性签名。'"
						disabled
						disabledColor="#ffffff"
						placeholder="请输入个性签名"
						border="none"
					></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="注册" borderBottom>{{ register_time }}</u-form-item>
				<u-form-item label="昵称" prop="userCenterInfo.userName" borderBottom>
					<u--input placeholder="请输入昵称" border="none" v-model="formData.userCenterInfo.userName"></u--input>
				</u-form-item>
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
				<u-form-item label="电话" prop="userCenterInfo.phone" borderBottom>
					<u--input placeholder="请输入电话" border="none" v-model="formData.userCenterInfo.phone"></u--input>
				</u-form-item>
				<u-form-item label="邮箱" prop="userCenterInfo.email" borderBottom>
					<u--input placeholder="请输入邮箱" border="none" v-model="formData.userCenterInfo.email"></u--input>
				</u-form-item>
				<u-form-item label="地址" borderBottom @click="showAddress = true">
					<u--input
						v-model="formData.userCenterInfo.address"
						disabled
						disabledColor="#ffffff"
						placeholder="请选择地区"
						border="none"
					></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
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

		<u-modal :show="showSignature" title="修改个签" showCancelButton @confirm="showSignature = false" @cancel="showSignature = false">
			<view class="slot-content">
				<u-textarea confirmType="done" v-model="formData.userCenterInfo.desc" placeholder="编辑个签,展示我的独特态度." count></u-textarea>
			</view>
		</u-modal>

		<u-modal :show="showAddress" title="所在地" showCancelButton @confirm="showAddress = false" @cancel="showAddress = false">
			<view class="slot-content">
				<view class="top"><u--text type="primary" text="使用当前位置"></u--text></view>
				<view class="bottom">
					<u-form labelPosition="left" :model="addressData" :rules="rules" ref="form1">
						<u-form-item label="国家" borderBottom @click="showAddress = true">
							<u--input
								v-model="addressData.country"
								disabled
								disabledColor="#ffffff"
								placeholder="请选择国家"
								border="none"
							></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="省市" borderBottom @click="showAddress = true">
							<u--input
								v-model="addressData.province"
								disabled
								disabledColor="#ffffff"
								placeholder="请选择地区"
								border="none"
							></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
					</u-form>
				</view>
			</view>
		</u-modal>
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
			addressData: {
				country: '', //国家
				province: '' //省市
			},
			value1: '',
			showSex: false, //展示性别修改框
			showBirth: false, //展示生日修改框
			showSignature: false, //展示签名修改框
			showAddress: false, //展示地址页面
			rules: {
				'userCenterInfo.sex': {
					type: 'string',
					max: 1,
					required: true,
					message: '请选择男或女',
					trigger: ['blur', 'change']
				},
				'userCenterInfo.userName': {
					type: 'string',
					max: 6,
					required: true,
					message: '请输入正确的昵称',
					trigger: ['blur', 'change']
				},
				'userCenterInfo.phone': [
					{
						type: 'string',
						required: true,
						message: '请输入号码',
						trigger: ['blur', 'change']
					},
					{
						validator: (rule, value, callback) => {
							return uni.$u.test.mobile(value)
						},
						message: '请输入正确的号码',
						trigger: ['blur']
					}
				],
				'userCenterInfo.email': [
					{
						type: 'string',
						required: true,
						message: '请输入邮箱',
						trigger: ['blur', 'change']
					},
					{
						validator: (rule, value, callback) => {
							const regEmail = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
							return regEmail.test(value)
						},
						message: '请输入正确的邮箱',
						trigger: ['blur']
					}
				]
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
	computed: {
		register_time() {
			return dayjs(this.formData.userCenterInfo.registerTime * 1000).format('YYYY-MM-DD')
		}
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
	.slot-content {
		width: 100%;
	}
}
</style>
