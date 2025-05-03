/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Crear la aplicación Vue
const app = createApp(App);

// Agregar las dependencias
app.use(store);
app.use(router);

// Montar la aplicación
app.mount("#app");
