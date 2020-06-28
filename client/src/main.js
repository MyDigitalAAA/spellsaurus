// Core
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import Globals from './global-components.js'
Globals.forEach(component => {
    Vue.component(component.name, component)
});

// Auth
require('dotenv').config()

// Jquery
import jquery from 'jquery'
window.$ = jquery
window.jquery = jquery

// Styles
import './assets/scss/_global.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.js'

// Plugins
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)

import { VueMasonryPlugin } from 'vue-masonry';
Vue.use(VueMasonryPlugin)

import clipboard from 'v-clipboard'
Vue.use(clipboard)

// FUNCTIONS
var filter = function(text, length, clamp){
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    var content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
};
Vue.filter('truncate', filter);

// Router
import routes from './routes'
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: "",
    linkExactActiveClass: "active",
});

// Mount Vue
const app = new Vue({
    render: h => h(App),
    router
})
app.$mount('#srs')
