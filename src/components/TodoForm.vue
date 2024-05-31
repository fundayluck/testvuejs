<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="title" placeholder="Todo title" />
    <button type="submit">{{ isEdit ? "Update" : "Add" }} Todo</button>
  </form>
</template>

<script>
export default {
  props: ["todo", "isEdit"],
  data() {
    return {
      title: this.todo ? this.todo.title : "",
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit", { ...this.todo, title: this.title });
    },
  },
};
</script>
