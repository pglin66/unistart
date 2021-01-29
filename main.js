import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'


import store from './store'
Vue.prototype.$store = store

import share from './mixin/share.js'
Vue.mixin(share)

import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
Vue.mixin(MescrollMixin)
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

import request from 'utils/request.js'
Vue.prototype.$request=request

import moment from './utils/moment.js'
Vue.prototype.$moment = moment;
Vue.filter('moment', function(data, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(data).format(pattern)
})





const app = new Vue({
	store,
    ...App
})
app.$mount()
