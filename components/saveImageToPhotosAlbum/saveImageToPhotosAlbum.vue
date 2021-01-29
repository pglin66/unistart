<template>
	<block>
		<button :class="className" type="default" open-type="openSetting" v-if="iswritePhotosAlbum==false" @opensetting="settingSavePoster"><slot></slot></button>
		<view :class="className" @click="savePoster" v-if="iswritePhotosAlbum!=false"><slot></slot></view>
	</block>
</template>

<script>
	export default {
		props:{
			className:'',
			url:''
		},
		data() {
			return {
				iswritePhotosAlbum:undefined
			}
		},
		onLoad() {
			uni.getSetting({
				success: (res) => {
					console.log(res)
					if (!res.authSetting['scope.writePhotosAlbum']) {
						uni.authorize({
							scope: 'scope.writePhotosAlbum',
							success: (res) => {
								this.iswritePhotosAlbum = true;
							},
							fail: () => {
								this.iswritePhotosAlbum = false;
							}
						})
					}
					this.iswritePhotosAlbum = res.authSetting['scope.writePhotosAlbum']
				}
			})
			
		},
		methods: {
			settingSavePoster(e) {
				console.log(e.detail.authSetting['scope.writePhotosAlbum'])
				if (e.detail.authSetting['scope.writePhotosAlbum']) {
					this.iswritePhotosAlbum = true;
					this.savePoster();
				} else {
					this.iswritePhotosAlbum = false;
					uni.showToast({
						title: "请授权保存到相册！",
						icon: "none"
					});
				}
			},
			savePoster() {
				uni.showLoading({
					title:'下载中'
				})
				uni.downloadFile({
					url: this.url, //图片地址
					success: (res) => {
						uni.hideLoading()
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: () => {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: (res) => {
									if (res.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
										uni.showToast({
											title: "fail cancel",
											icon: "none"
										});
									} else {
										this.iswritePhotosAlbum = false
										uni.showToast({
											title: "授权失败，请重新保存",
											icon: "none"
										});
									}
			
								}
							});
						}
					},
					fail() {
						uni.hideLoading()
						uni.showToast({
							title: "下载失败，请稍后重试",
							icon: "none"
						});
					}
				})
			},
		}
	}
</script>

<style>

</style>
