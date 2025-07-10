<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";
import { useCoachesStore } from "../../store";

export default {
  setup() {
    const coachesStore = useCoachesStore();
    return { coachesStore };
  },

  components: { CoachForm },

  methods: {
    saveData(data) {
      this.coachesStore.registerCoach(data);
      this.$router.replace("/coaches");
    },
  },
};
</script>
