import { createApp } from "vue";
import router from "./router.js";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-badge", BaseBadge);

app.mount("#app");
