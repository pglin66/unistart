<template>
	<mescroll-body  @init="mescrollInit" @down="downCallback" @up="upCallback" >
		<view>
			<view>
				{{requestStatus}}
			</view>
			<view class="" @click="login">dfadsa</view>
		</view>
		 <vus-layer>
			 <view slot="page">
				 <!--在这里写入页面层的html内容-->
				 <view><input type="text" placeholder="用户名" /></view>
				 <view><input type="text" password placeholder="密码" /></view>
			 </view>
		 </vus-layer>
	</mescroll-body>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		computed:{
			requestStatus(){
				return this.$requestStore.state.status
			},
			hasLogin(){
				return this.$store.state.hasLogin
			}
		},
		onLoad() {
			
			  
			this.$request({
				
			})
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
