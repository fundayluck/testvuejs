import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AddTodo from '@/views/AddTodo.vue'
import EditTodo from '@/views/EditTodo.vue'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/add',
        name: 'AddTodo',
        component: AddTodo
    },
    {
        path: '/edit/:id',
        name: 'EditTodo',
        component: EditTodo
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
