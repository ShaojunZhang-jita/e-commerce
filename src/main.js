// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入图标样式
import './assets/fonts/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局的样式
import './assets/css/global.css'
// 引入axios，进行接口的调用
import axios from 'axios';
// 去接口文档找到根基路劲然后复制如下
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    // 设置请求拦截器来设置请求头为token 这样需要授权得api就可以使用了 利用axios请求拦截器来添加token 请求拦截器就是在请求之前需要执行得操作 就是预处理
axios.interceptors.request.use(config => {
        // 为请求，添加token验证得authorization字段
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    })
    // 挂在之后我们就可以用vue实例对象即this.$http来调取方法进而获得接口的数据 仔细观察关于this.$等方法，我们都是挂在到prototype中的。
Vue.prototype.$http = axios //全局注册，使用方法为:this.$axios
    // 挂在组件库
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})