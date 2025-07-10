import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state() {
    return {
      userId: "c3",
    };
  },

  getters: {
    getUserId(state) {
      return state.userId;
    },
  },
});
