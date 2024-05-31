<template>
  <div class="container">
    <div class="box">
      <h1 class="title">Add Todo</h1>
      <form @submit.prevent="handleSubmit">
        <div class="field">
          <div class="control">
            <input class="input" v-model="title" placeholder="Todo title" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" type="submit">Add Todo</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    async handleSubmit() {
      try {
        await this.addTodo({
          title: this.title,
          completed: false,
        });
        this.title = "";
        this.$router.push("/");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },
  },
};
</script>
