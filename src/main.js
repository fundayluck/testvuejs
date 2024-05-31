import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import 'bulma/css/bulma.css';

const app = createApp(App);

app.config.globalProperties.$http = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

// Ensure the store is initialized before mounting the app
store.dispatch('fetchTodos').then(() => {
    app.use(router).use(store).mount('#app');
}).catch(error => {
    console.error('Error initializing app:', error);
    app.use(router).use(store).mount('#app');
});
