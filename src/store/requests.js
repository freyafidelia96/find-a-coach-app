import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useRequestsStore = defineStore("requests", {
  state() {
    return {
      requests: [
        {
          id: "2023 - 4 - 23",
          coachId: "c1",
          userEmail: "freyafidelia@gmail.com",
          message: "not a real request",
        },
      ],
    };
  },

  actions: {
    async sendRequest(request) {
      const newRequest = {
        userEmail: request.email,
        message: request.message,
      };
      const response = await fetch(
        `https://find-a-coach-app-bd2d2-default-rtdb.firebaseio.com/requests/${request.coachId}.json`,
        {
          method: "POST",
          body: JSON.stringify(newRequest),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to send request."
        );
        throw error;
      }

      newRequest.id = responseData.name;
      newRequest.coachId = request.coachId;
      this.requests.push(newRequest);
      console.log(newRequest);
    },

    async fetchRequests() {
      const coachId = useUserStore().userId;

      const response = await fetch(
        `https://find-a-coach-app-bd2d2-default-rtdb.firebaseio.com/requests/${coachId}.json`
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to fetch requests."
        );
        throw error;
      }

      const requests = [];
      for (const key in responseData) {
        const request = {
          id: key,
          coachId: coachId,
          userEmail: responseData[key].userEmail,
          message: responseData[key].message,
        };
        requests.push(request);
      }

      this.requests = requests;
    },
  },

  getters: {
    getRequests(state) {
      const coachId = useUserStore().getUserId;
      return state.requests.filter((req) => req.coachId === coachId);
    },

    hasRequests(state) {
      return this.getRequests && this.getRequests.length > 0;
    },
  },
});
