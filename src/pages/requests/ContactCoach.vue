<template>
  <form @submit.prevent="submitData">
    <div class="form-control">
      <label for="email">Your E-mail</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea
        name="message"
        id="message"
        rows="5"
        v-model.trim="message"
      ></textarea>
    </div>
    <p class="errors" v-if="!formIsValid">
      Please enter an email and non-empty message
    </p>
    <div class="actions">
      <base-button>Send message</base-button>
    </div>
  </form>
</template>

<script>
import { useRequestsStore } from "../../store";
export default {
  setup() {
    const requestStore = useRequestsStore();
    return { requestStore };
  },

  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,
    };
  },

  methods: {
    submitData() {
      this.formIsValid = true;

      if (
        this.message === "" ||
        !this.email.includes("@") ||
        this.email === ""
      ) {
        this.formIsValid = false;
        return;
      }

      this.requestStore.sendRequest({
        message: this.message,
        email: this.email,
        coachId: this.$route.params.id,
      });

      this.$router.replace("/requests");
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
