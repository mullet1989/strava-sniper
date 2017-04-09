import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Kom from '@/components/Kom'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Auth',
            component: Auth
        }, {
            path: '/kom',
            name: 'Kom',
            component: Kom,
            beforeEnter: (to, from, next) => {
                console.log(`going to the ${next.path} route`);
                next();
            }
        }
    ]
})
