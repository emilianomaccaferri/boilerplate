import Vue from 'vue'

Vue.component('test', require('./ui/components/Component.vue').default);

const app = new Vue({
    el: '#app',
});

