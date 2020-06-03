import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import routes from './routes'

window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false
Vue.use(VueRouter)

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
