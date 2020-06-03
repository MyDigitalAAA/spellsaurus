// Core
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import { VueMasonryPlugin } from 'vue-masonry';

// Router
import routes from './routes'

// Jquery
import jquery from 'jquery'
window.$ = jquery
window.jquery = jquery

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMasonryPlugin)


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
