<template>
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Recieved</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item
          v-for="req in receivedRequests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't recieved any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import { useRequestsStore } from "../../store";
import RequestItem from "../../components/requests/RequestItem.vue";

export default {
  setup() {
    const requestStore = useRequestsStore();
    return { requestStore };
  },

  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  components: { RequestItem },

  computed: {
    receivedRequests() {
      console.log(this.requestStore.getRequests);
      return this.requestStore.getRequests;
    },

    hasRequests() {
      return this.requestStore.hasRequests;
    },
  },

  created() {
    this.loadRequests();
  },

  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.requestStore.fetchRequests();
      } catch (error) {
        this.error = error.message || "Something Failed!";
      }
      this.isLoading = false;
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
