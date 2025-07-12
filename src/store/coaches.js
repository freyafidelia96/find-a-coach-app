import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useCoachesStore = defineStore("coaches", {
  state() {
    return {
      coaches: [
        {
          id: "c1",
          firstName: "Maximilian",
          lastName: "Schwarzmüller",
          areas: ["frontend", "backend", "career"],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
        },
        {
          id: "c2",
          firstName: "Julie",
          lastName: "Jones",
          areas: ["frontend", "career"],
          description:
            "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
          hourlyRate: 30,
        },
      ],
    };
  },

  actions: {
    async registerCoach(data) {
      const useStore = useUserStore();

      const userId = useStore.getUserId;
      const cleanedData = {
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas,
      };

      const response = await fetch(
        `https://find-a-coach-app-bd2d2-default-rtdb.firebaseio.com/coaches/${userId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(cleanedData),
        }
      );

      if (!response.ok) {
        // error
      }

      this.coaches.push({
        ...cleanedData,
        id: userId,
      });
    },

    async loadCoaches() {
      const coaches = [];

      const response = await fetch(
        `https://find-a-coach-app-bd2d2-default-rtdb.firebaseio.com/coaches.json`
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      console.log(response);

      console.log(responseData);

      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
        };

        coaches.push(coach);
      }

      this.coaches = coaches;
    },
  },

  getters: {
    getCoaches(state) {
      return state.coaches;
    },

    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },

    isCoach(state) {
      const useStore = useUserStore();
      const userId = useStore.getUserID;
      return state.coaches.some((coach) => coach.id === userId);
    },
  },
});
