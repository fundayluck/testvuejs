<template>
  <div class="container">
    <div class="box">
      <h1 class="title">Edit Todo</h1>
      <form @submit.prevent="handleSubmit">
        <div class="field">
          <div class="control">
            <input
              class="input"
              v-model="todo.title"
              placeholder="Todo title"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" type="submit">Update Todo</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditTodo",
  data() {
    return {
      todo: {
        id: null,
        title: "",
      },
    };
  },
  computed: {
    ...mapGetters(["todos"]),
  },
  methods: {
    ...mapActions(["fetchTodos", "updateTodo"]),
    loadTodo() {
      const id = this.$route.params.id;
      const todo = this.todos.find((todo) => todo.id === parseInt(id));
      if (todo) {
        this.todo = { ...todo };
      }
    },
    async handleSubmit() {
      try {
        await this.updateTodo(this.todo);
        this.$router.push("/");
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    },
  },
  watch: {
    todos: {
      handler(newTodos) {
        if (newTodos && newTodos.length > 0) {
          this.loadTodo();
        }
      },
      immediate: true,
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>
