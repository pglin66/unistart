<template>
	<mescroll-body  @init="mescrollInit" @down="downCallback" @up="upCallback" >
		<view>
			<view>
				{{hasLogin}}
			</view>
			<view class="" @click="login">dfadsa</view>
		</view>
	</mescroll-body>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				
			}
		},
		computed:{
			hasLogin(){
				return this.$store.state.hasLogin
			}
		},
		onLoad() {
			/* this.$request({
				
			}) */
		},
		methods: {
			login(){
				this.$store.commit('login',!this.$store.state.hasLogin)
			},
			downCallback(){
						
				this.mescroll.resetUpScroll();
			
			},
			upCallback(page) {
				this.mescroll.endSuccess(1);
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
