<template>
	<view class="container">
		<view class="header">
			<u-navbar
				title="个人中心"
				@leftClick="leftClick"
				:autoBack="true"
				fixed
				border
			></u-navbar>
		</view>
		<view class="main">
			<u--form labelPosition="left" :model="formData" :rules="rules" ref="form1">
				<u-navbar
					@leftClick="leftClick"
					:autoBack="true"
					rightIcon="arrow-right"
					border
					class="bar"
				>
					<view class="u-nav-slot" slot="left">头像</view>
					<view class="u-nav-slot" slot="center">
						<u-avatar shape="square"></u-avatar>
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
					<u--input
						placeholder="请输入昵称"
						border="none"
						v-model="formData.userCenterInfo.userName"
					></u--input>
				</u-form-item>
				<u-form-item
					label="性别"
					prop="userCenterInfo.sex"
					borderBottom
					@click="showSex = true"
				>
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
					<u--input
						placeholder="请输入电话"
						border="none"
						v-model="formData.userCenterInfo.phone"
					></u--input>
				</u-form-item>
				<u-form-item label="邮箱" prop="userCenterInfo.email" borderBottom>
					<u--input
						placeholder="请输入邮箱"
						border="none"
						v-model="formData.userCenterInfo.email"
					></u--input>
				</u-form-item>
				<u-form-item label="地址" borderBottom @click="getAddress">
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

		<u-action-sheet
			:show="showSex"
			:actions="actionsSex"
			title="请选择性别"
			@close="showSex = false"
			@select="sexSelect"
		></u-action-sheet>
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

		<u-modal
			:show="showSignature"
			title="修改个签"
			showCancelButton
			@confirm="showSignature = false"
			@cancel="showSignature = false"
		>
			<view class="slot-content">
				<u-textarea
					confirmType="done"
					v-model="formData.userCenterInfo.desc"
					placeholder="编辑个签,展示我的独特态度."
					count
				></u-textarea>
			</view>
		</u-modal>

		<u-modal
			:show="showAddress"
			title="所在地"
			showCancelButton
			@confirm="confirmPosition"
			@cancel="showAddress = false"
		>
			<view class="slot-content">
				<view class="top" @click="getPosition">
					<u--text type="primary" text="使用当前位置" size="18px"></u--text>
				</view>
				<view class="bottom">
					<u-form labelPosition="left" :model="addressData" :rules="rules" ref="form1">
						<u-form-item label="国家" borderBottom>
							<u--input
								v-model="addressData.country"
								disabled
								disabledColor="#ffffff"
								placeholder="请选择国家"
								border="none"
							></u--input>
						</u-form-item>
						<u-form-item label="省市" borderBottom @click="getProvince">
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
		<u-picker
			:show="showProvince"
			ref="uPicker"
			:columns="columns"
			@confirm="confirm"
			@close="showProvince = false"
			@change="changeHandler"
			closeOnClickOverlay
			:defaultIndex="defaultArr"
		></u-picker>
	</view>
</template>

<script>
import dayjs from 'dayjs'
import { getUserDetailsReq } from '../../api/index.js'
import { getPosition } from '@/utils/getPosition.js'
import { getPositionReq } from '@/api/index.js'
export default {
	data() {
		return {
			formData: {
				userCenterInfo: {}
			},
			addressData: {
				country: '中国', //国家
				province: '' //省市
			},
			areas: [], //省市区的数据
			labelList: [],
			value1: '',
			showSex: false, //展示性别修改框
			showBirth: false, //展示生日修改框
			showSignature: false, //展示签名修改框
			showAddress: false, //展示地址页面
			showProvince: false, //展示省份列表
			columns: [],
			columnData: [],
			defaultArr: [0, 0, 0], //城市默认值
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
		getPosition,
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
		async getAddress() {
			this.showAddress = true
			const res = await getPositionReq(this.addressData.country)
			this.areas = res.districts[0].districts
			console.log('res', this.areas)
			let arr = []
			let childarr = []
			let childrenarr = []
			let brr = []
			let crr = []
			let drr = []
			this.areas.forEach(item => {
				arr.push(item.name)
				childrenarr.push(item.districts)
			})
			console.log('arr', arr)
			console.log('childrenarr', childrenarr)
			for (let i = 0; i < childrenarr.length; i++) {
				// 每循环一次push一个空数组来赋值
				brr.push([])
				drr.push([])
				for (let j = 0; j < childrenarr[i].length; j++) {
					brr[i].push(childrenarr[i][j].name)
					drr[i].push([])
					for (let k = 0; k < childrenarr[i][j].districts.length; k++) {
						//给空数组的每项空数组赋值
						drr[i][j].push(childrenarr[i][j].districts[k].name)
					}
				}
			}
			this.areas[0].districts.forEach(item1 => {
				childarr.push(item1.name)
			})
			this.areas[0].districts[0].districts.forEach(item2 => {
				crr.push(item2.name)
			})
			this.columns.push(arr, childarr, crr)
			console.log('drr', drr)
			console.log('brr', brr)
			this.columnData.push(brr, drr)
		},
		// 获取省份信息
		async getProvince() {
			this.showProvince = true
		},
		confirm(e) {
			this.addressData.province = e.value.join('-')
			this.showProvince = false
			this.defaultArr = e.indexs
		},
		changeHandler(e) {
			const {
				columnIndex,
				value,
				values, //为当前变化列的数组内容
				index,
				picker = this.$refs.uPicker //微信小程序无法将picker实例传出来，只能通过ref操作
			} = e
			//当第一列值变化时，变化第二列（后一列）对应的选项
			if (columnIndex === 0) {
				//picker为选择器的this实例，变化第二列对应的选项
				picker.setColumnValues(1, this.columnData[0][index])
				picker.setColumnValues(2, this.columnData[1][e.indexs[0]][e.indexs[1]])
			} else if (columnIndex === 1) {
				picker.setColumnValues(2, this.columnData[1][e.indexs[0]][e.indexs[1]])
			}
		},
		confirmPosition() {
			this.formData.userCenterInfo.address = this.addressData.province
			this.showAddress = false
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
	.top {
		margin: 20px 0;
	}
}
</style>
