// Core
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

// Auth
require('dotenv').config()

// Router
import routes from './routes'
Vue.use(VueRouter)

// Jquery
import jquery from 'jquery'
window.$ = jquery
window.jquery = jquery

// Global styles
import './assets/scss/_global.scss'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.js'
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)

// Masonry
import { VueMasonryPlugin } from 'vue-masonry';
Vue.use(VueMasonryPlugin)

// Clipboard plugin
import clipboard from 'v-clipboard'
Vue.use(clipboard)

Vue.config.productionTip = false

var filter = function(text, length, clamp){
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    var content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
};
Vue.filter('truncate', filter);

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
