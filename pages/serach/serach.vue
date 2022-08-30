<template>
	<view class="container">
		<view class="header">
			<uni-forms ref="form" :modelValue="formData" class='search-input'>
				<uni-forms-item name="keyWord">
					<uni-easyinput type="text" v-model="formData.keyWord" placeholder="请输入用户名/邮箱搜索" suffixIcon="search"  @input='onInputKeyword'/>
				</uni-forms-item>
			</uni-forms>
			<text class="btn">取消</text>
		</view>
		<view class="main">
			<view class="users" v-if="formData.userList.length!=0">
				<h2>用户</h2>
				<view class="user" v-for="item in formData.userList" :key="item._id" @click="goUserDetails(item._id)">
					<image src="../../server/app/public/emery/1655262869261.jpg" mode=""></image>
					<view class="user-right">
						<text>{{`${item.userName}(${item.email})`}}</text>
						<button class="is-friend">发信息</button>
					</view>
				</view>
			</view>
			<view class="users" v-if="formData.groupList.length!=0">
				<h2>群组</h2>
				<view class="user" v-for="item in formData.groupList" :key="item._id">
					<image src="../../server/app/public/emery/1655262869261.jpg" mode=""></image>
					<view class="user-right">
						<text>{{item.name}}</text>
						<button class="is-not-friend">发信息</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {searchUserReq,searchGroupReq} from '../../api/index.js'
	import {debounce} from '@/utils/debounce.js'
	export default {
		data() {
			return {
				formData:{
					userList:[],
					groupList:[],
					keyWord:'',
				},
			}
		},
		methods: {
			//搜索框防抖
			onInputKeyword:debounce(function(){
				if(this.formData.keyWord==='') {
					this.formData.userList = []
					this.formData.groupList = []
					return
				}
				this.getSearchUserList()
				this.getSearchGroupList()
			},500),
			// 获取搜索的用户列表
			async getSearchUserList(){
				const res = await searchUserReq({userInfo:this.formData.keyWord})
				console.log('Users',res)
				if(res.code===0){
					this.formData.userList = res.data
				}
			},
			// 获取搜索的群列表
			async getSearchGroupList(){
				const res = await searchGroupReq({userInfo:this.formData.keyWord})
				console.log('Groups',res)
				if(res.code===0){
					this.formData.groupList = res.data
				}
			},
			// 进入用户详情页
			goUserDetails(userId){
				uni.navigateTo({
					url:`/pages/user_details/user_details?userId=${userId}`,
				})
			}
		}
	}
</script>

<style lang="scss">
	.header{
		position: relative;
		
		.search-input{
			width: 80%;
			padding: 20px;
		}
		.btn{
			display: inline-block;
			width: 60px;
			height: 40px;
			font-family: PingFangSC-Regular;
			font-size: 15px;
			color: #272832;
			letter-spacing: -0.48px;
			font-weight: 400;
			text-align: center;
			line-height: 40px;
			position: absolute;
			top: 20px;
			right: 5px;
		}
		
	}
	.header::after{
		content: '';
		position: absolute;
		bottom:30px;
		width: 100%;
		height: 1px;
		background-color:gainsboro;
	}
	.users{
		padding: 10px 20px;
		margin-bottom: 20px;
		h2{
			margin-top: -20px;
			margin-bottom: 15px;
		}
		.user{
			display: flex;
			justify-content: space-between;
			margin-bottom: 15px;
			image{
				width: 40px;
				height: 40px;
				border-radius: 10px;
			}
			.user-right{
				display: flex;
				flex: 1;
				align-items: center;
				height: 40px;
				margin-left: 15px;
				text{
					font-size: 18px;
					display: inline-block;
					width: 220px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.is-friend{
					width: 65px;
					height: 24px;
					background: #FFE431;
					border-radius: 12px;
					font-size: 10px;
					line-height: 24px;
					margin-right: 0;
				}
				.is-not-friend{
					width: 65px;
					height: 24px;
					background: rgba(74,170,255,0.10);
					border-radius: 12px;
					font-size: 10px;
					line-height: 24px;
					margin-right: 0;
					color: #4AAAFF;
				}
				}
		}
	}

</style>
