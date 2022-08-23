<template>
	<view class="container">
		<view class="header">
			<uni-forms ref="form" :modelValue="formData" class='search-input'>
				<uni-forms-item name="keyWord">
					<uni-easyinput type="text" v-model="formData.keyWord" placeholder="请输入用户名/邮箱搜索" suffixIcon="search" />
				</uni-forms-item>
			</uni-forms>
			<text class="btn">取消</text>
		</view>
		<view class="main">
			<view class="users">
				<h2>用户</h2>
				<view class="user">
					<image src="../../server/app/public/emery/1655262869261.jpg" mode=""></image>
					<view class="user-right">
						<text>Emery</text>
						<button>发信息</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData:{
					keyWord:''
				}
			}
		},
		methods: {
			
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
</style>
