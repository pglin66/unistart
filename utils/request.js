/*!
 * @Name：auth v1.0.0 uni-app 发送请求
 * @Site：http://www.plin.cc | https://plin.github.io
 * @Author：plin
 * @License：MIT
 * @开发日期：2021-02-01
 */
import Vuex from 'vuex';
let request = function(obj) {
	let userinfo = uni.getStorageSync('userinfo')
	if(!obj){
		return;
	}
	obj.header = {
		showLoading:true,
		...obj.header
	}
	if (userinfo && userinfo.OpenId) {
		obj.header.OpenId=userinfo.OpenId		
	}
	
	if(obj.header.showLoading){
		uni.showLoading({
			title: '加载中'
		});
	}
	console.log(this.$requestStore.commit('status',102))
	this.$requestStore.commit('route',this.route)
	//this.$requestStore.moment('status',102)
	
	if (obj.success) {
		let success = obj.success
		obj.success = function(res) {
			uni.hideLoading();			
			if (res.data.Status == 102) {			
				//请登录
				this.$requestStore.commit('status',res.data.Status)
				this.$requestStore.commit('route',this.route)
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

export default {
    install(Vue) {
		Vue.prototype.$requestStore = new Vuex.Store({			
			state: {
				status:-1,//102未登录
				route:''//异常页面地址 用于登录后跳转
			},
			mutations: {
				status(state, value) {
					state.status=value;
				},
				route(state, value) {
					state.route=value;
				}
			}
		})
		Vue.prototype.$request =request
	}
}