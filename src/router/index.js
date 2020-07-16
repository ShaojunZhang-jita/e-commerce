import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/Users.vue'
import Roles from '../components/Roles.vue'
Vue.use(Router)

const router = new Router({
        routes: [
            { path: '/', redirect: '/login' },
            {
                path: '/login',
                component: Login,

            },
            {
                path: '/Home',
                redirect: '/users',
                component: Home,
                children: [{
                        path: '/users',
                        component: Users
                    },
                    {
                        path: '/roles',
                        component: Roles
                    }
                ]
            }
        ]
    })
    // 为路由对象添加路由导航守卫
router.beforeEach((to, from, next) => {
    // 如果用户访问的是登录页面 直接放行
    if (to.path === '/login') return next();
    // 从sesstionStorage中得到token
    const token = sessionStorage.getItem('token');
    // 如果没有token值 那么就跳转到'/login
    if (!token) return next('/login');
    // 如果有token则放行
    next();
})
export default router;