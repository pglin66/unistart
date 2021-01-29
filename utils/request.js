

let ajax = function(obj) {
	let userinfo = uni.getStorageSync('userinfo')
	console.log(userinfo)
	obj.header = {
		showLoading:true,
		...obj.header
	}
	if (userinfo && userinfo.OpenId) {
		obj.header.OpenId=userinfo.OpenId		
	}
	console.log(this.route)
	
	if(obj.header.showLoading){
		uni.showLoading({
			title: '加载中'
		});
	} 	
	if (obj.success) {
		let success = obj.success
		obj.success = function(res) {
			
			uni.hideLoading();
			if (res.data.Status == 102) {
				let tologin = uni.getStorageSync('tologin');
				if(tologin!=1){
					uni.setStorageSync('tologin', '1');
					uni.navigateTo({
						url: '/pages/login/login?login=1'
					})
				}
				return;
			}
			if (res.data.Status != 100) {
				uni.showToast({
					title: res.data.Message,
					icon: 'none',
					duration: 2000
				});

			}
			success(res);
		}
	}
	if (obj.fail) {
		let fail = obj.fail
		obj.fail = function(res) {
			uni.hideLoading();
			fail(res);
		}
	}


	uni.request(obj);
}

export default ajax;
