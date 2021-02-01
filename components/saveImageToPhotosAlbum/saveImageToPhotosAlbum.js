/*!
 * @Name：auth v1.0.0 uni-app 保存到相册
 * @Site：http://www.plin.cc | https://plin.github.io
 * @Author：plin
 * @License：MIT
 * @开发日期：2020-02-01
 */
import Vuex from 'vuex';
export default {
    install(Vue) {
		Vue.prototype.$saveImageToPhotosAlbum = new Vuex.Store({			
			state: {				
				status:undefined,//undefind 没有授权过，false拒绝过授权，true已授权
			},
			mutations: {
				status(state, value) {
					state.status=value;
				}
			}
		})
	}
}