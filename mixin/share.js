export default {
	data() {
		let userinfo = uni.getStorageSync('userinfo')
		return {
			share: {
				title: '昂立拼团',
				path: '/pages/index/index?fromUserId=' + (userinfo ? userinfo.UserId : 0),
				imageUrl: '',
				desc: '',
				content: ''
			},
			isIPX: false,
		}
	},
	created() {
		uni.getSystemInfo({
			success: (res) => {
				if (res.model.search('iPhone') != -1 && res.screenHeight > 800) {
					this.isIPX = true
				}
			}
		})
	},
	onShareAppMessage(res) {
		console.log('shareInfo:' + JSON.stringify(this.share))
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
			desc: this.share.desc,
			content: this.share.content,
			success(res) {
				uni.showToast({
					title: '分享成功'
				})
			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			}
		}
	}
}
