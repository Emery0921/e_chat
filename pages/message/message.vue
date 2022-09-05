<template>
	<view class="container">
		<view class="header"><u-navbar :title="title" :autoBack="true" fixed border @leftClick="goBack"></u-navbar></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: ''
		}
	},
	methods: {
		//返回上一层
		goBack() {
			uni.navigateBack({
				delta: -1
			})
		}
	},
	onLoad() {}
}
</script>

<style lang="scss" scoped></style>
