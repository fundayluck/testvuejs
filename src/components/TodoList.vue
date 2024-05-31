<template>
  <div class="container">
    <div class="box">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todos" :key="todo.id">
            <td>{{ todo.title }}</td>
            <td>
              <button
                class="button is-info is-small mr-2"
                @click="$emit('edit', todo)"
              >
                Edit
              </button>
              <button
                class="button is-danger is-small"
                @click="$emit('delete', todo.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav
        class="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <button
          class="pagination-previous"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Previous
        </button>
        <button
          class="pagination-next"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Next
        </button>
        <ul class="pagination-list">
          <li v-for="page in visiblePages" :key="page">
            <button
              class="pagination-link"
              :class="{ 'is-current': page === currentPage }"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    todos: {
      type: Array,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    visiblePages() {
      const range = 2;
      let start = Math.max(1, this.currentPage - range);
      let end = Math.min(this.totalPages, this.currentPage + range);

      if (this.currentPage <= range) {
        end = Math.min(this.totalPages, 1 + range * 2);
      }
      if (this.currentPage + range >= this.totalPages) {
        start = Math.max(1, this.totalPages - range * 2);
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  watch: {
    currentPage(newPage) {
      this.$emit("change-page", newPage);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>
