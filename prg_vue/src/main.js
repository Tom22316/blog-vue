import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 样式
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './custom.css';

createApp(App).use(store).use(router).mount('#app')
