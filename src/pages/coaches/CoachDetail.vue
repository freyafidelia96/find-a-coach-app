<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button :link="true" :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :key="area"
        :title="area"
        :type="area"
      ></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
import { useCoachesStore } from "../../store";

export default {
  setup() {
    const coachesStore = useCoachesStore();
    return { coachesStore };
  },

  props: ["id"],

  data() {
    return {
      selectedCoach: null,
    };
  },

  computed: {
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },

    rate() {
      return this.selectedCoach.hourlyRate;
    },

    contactLink() {
      return this.$route.path + "/" + this.id + "/contact";
    },

    areas() {
      return this.selectedCoach.areas;
    },

    description() {
      return this.selectedCoach.description;
    },
  },

  created() {
    this.selectedCoach = this.coachesStore.getCoaches.find(
      (coach) => coach.id === this.id
    );
  },
};
</script>
