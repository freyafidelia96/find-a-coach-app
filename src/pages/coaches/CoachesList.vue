<template>
  <section>
    <div>Filter</div>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as a Coach</router-link>
    </div>
    <div>LIST OF Coaches</div>
    <ul v-if="hasCoaches">
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      ></coach-item>
    </ul>
    <h3 v-else>No Coaches available for now</h3>
  </section>
</template>
<script>
import { useCoachesStore } from "../../store";
import CoachItem from "../../components/coaches/CoachItem.vue";

export default {
  setup() {
    const coachesStore = useCoachesStore();
    return { coachesStore };
  },

  components: { CoachItem },

  computed: {
    filteredCoaches() {
      return this.coachesStore.getCoaches;
    },

    hasCoaches() {
      return this.coachesStore.hasCoaches;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
