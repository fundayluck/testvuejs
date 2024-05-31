import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        todos: JSON.parse(localStorage.getItem('todos')) || [],
        currentPage: 1,
        perPage: 10,
    },
    mutations: {
        SET_TODOS(state, todos) {
            state.todos = todos;
            localStorage.setItem('todos', JSON.stringify(todos));
            console.log('SET_TODOS:', todos);
        },
        ADD_TODO(state, todo) {
            state.todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(state.todos));
            console.log('ADD_TODO:', state.todos);
        },
        UPDATE_TODO(state, updatedTodo) {
            const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
            if (index !== -1) {
                state.todos.splice(index, 1, updatedTodo);
                localStorage.setItem('todos', JSON.stringify(state.todos));
                console.log('UPDATE_TODO:', state.todos);
            }
        },
        DELETE_TODO(state, id) {
            state.todos = state.todos.filter(todo => todo.id !== id);
            localStorage.setItem('todos', JSON.stringify(state.todos));
            console.log('DELETE_TODO:', state.todos);
        },
        SET_CURRENT_PAGE(state, page) {
            state.currentPage = page;
        },
    },
    actions: {
        async fetchTodos({ commit }) {
            if (localStorage.getItem('todos')) return;
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                commit('SET_TODOS', response.data);
                console.log('fetchTodos:', response.data);
            } catch (error) {
                console.error('Error fetching todos:', error.response ? error.response.data : error.message);
            }
        },
        async addTodo({ commit }, todo) {
            try {
                const response = await axios.post('https://jsonplaceholder.typicode.com/todos', todo);
                commit('ADD_TODO', response.data);
                console.log('addTodo:', response.data);
            } catch (error) {
                console.error('Error adding todo:', error.response ? error.response.data : error.message);
            }
        },
        async updateTodo({ commit }, todo) {
            try {
                const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);
                commit('UPDATE_TODO', response.data);
                console.log('updateTodo:', response.data);
            } catch (error) {
                console.error('Error updating todo:', error.response ? error.response.data : error.message);
            }
        },
        async deleteTodo({ commit }, id) {
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
                commit('DELETE_TODO', id);
                console.log('deleteTodo:', id);
            } catch (error) {
                console.error('Error deleting todo:', error.response ? error.response.data : error.message);
            }
        },
    },
    getters: {
        todos: state => state.todos,
        paginatedTodos: state => {
            const start = (state.currentPage - 1) * state.perPage;
            const end = state.currentPage * state.perPage;
            return state.todos.slice(start, end);
        },
        totalPages: state => {
            return Math.ceil(state.todos.length / state.perPage);
        },
    },
});

export default store;
