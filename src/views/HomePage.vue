<template>
  <div class="container">
    <div class="box">
      <h1 class="title">Todo List</h1>
      <router-link class="button is-primary" to="/add">Add Todo</router-link>
      <TodoList
        :todos="paginatedTodos"
        :totalPages="totalPages"
        @delete="deleteTodo"
        @edit="editTodo"
        @change-page="changePage"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TodoList from "@/components/TodoList.vue";

export default {
  name: "HomePage",
  components: {
    TodoList,
  },
  computed: {
    ...mapGetters(["paginatedTodos", "totalPages"]),
  },
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo"]),
    editTodo(todo) {
      this.$router.push({ name: "EditTodo", params: { id: todo.id } });
    },
    changePage(page) {
      this.$store.commit("SET_CURRENT_PAGE", page);
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>
