<template>
  <li>
    {{ todo.title }}
    <button @click="deleteTodo">Delete</button>
    <button @click="editTodo">Edit</button>
  </li>
</template>

<script>
export default {
  props: ["todo"],
  methods: {
    deleteTodo() {
      this.$emit("delete", this.todo.id);
    },
    editTodo() {
      this.$emit("edit", this.todo);
    },
  },
};
</script>
