import { defineStore } from "pinia";

export const useRequestsStore = defineStore("requests", {
  state() {
    return {
      requests: [],
    };
  },

  actions: {
    contactCoach(request) {
      const newRequest = {
        id: new Date().toISOString(),
        coachId: request.coachId,
        userEmail: request.email,
        message: request.message,
      };

      this.requests.push(newRequest);
    },
  },
});
