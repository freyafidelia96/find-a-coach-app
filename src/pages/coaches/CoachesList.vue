<template>
  <section>
    <coach-filter @change-filter="setFilter"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button :link="true" to="/register" v-if="!isCoach"
          >Register as a Coach</base-button
        >
      </div>
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
    </base-card>
  </section>
</template>
<script>
import { useCoachesStore } from "../../store";
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
  setup() {
    const coachesStore = useCoachesStore();
    return { coachesStore };
  },

  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },

  components: { CoachItem, CoachFilter },

  computed: {
    filteredCoaches() {
      const coaches = this.coachesStore.getCoaches;
      return coaches.filter((coach) => {
        const filters = this.activeFilters;
        const noFiltersActive =
          !filters.frontend && !filters.backend && !filters.career;

        if (noFiltersActive) return true;

        if (filters.frontend && coach.areas.includes("frontend")) return true;
        if (filters.backend && coach.areas.includes("backend")) return true;
        if (filters.career && coach.areas.includes("career")) return true;

        return false; // explicitly reject others
      });
    },

    hasCoaches() {
      return this.coachesStore.hasCoaches;
    },

    isCoach() {
      return this.coachesStore.isCoach;
    },
  },

  methods: {
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
      console.log(this.activeFilters);
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
