import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

//登录，手机绑定授权
import store from './store'
Vue.prototype.$store = store
//分享
import share from './mixin/share.js'
Vue.mixin(share)
//下载刷新下拉加载
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
Vue.mixin(MescrollMixin)
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

//请求封装
import requestInst from 'utils/request.js'
Vue.use(requestInst);

//倒计时
import moment from './utils/moment.js'
Vue.prototype.$moment = moment;
Vue.filter('moment', function(data, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(data).format(pattern)
})
//弹框组件
import vusLayerInit from '@/components/vusui-app-layer/vusui-layer.js';
import vusLayer from '@/components/vusui-app-layer/vusui-layer.vue';
Vue.use(vusLayerInit);
Vue.component('vus-layer', vusLayer); //设置组件名称
//https://vusui.github.io/#/app/preface

//保存相册状态管理初始化
import saveImageToPhotosAlbumInit from '@/components/saveImageToPhotosAlbum/saveImageToPhotosAlbum.js';
Vue.use(saveImageToPhotosAlbumInit);

const app = new Vue({
	store,
    ...App
})
app.$mount()
