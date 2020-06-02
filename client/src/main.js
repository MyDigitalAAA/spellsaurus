import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import routes from './routes'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: "",
    linkExactActiveClass: "active",
});

const app = new Vue({
    render: h => h(App),
    router
})

app.$mount('#srs')
