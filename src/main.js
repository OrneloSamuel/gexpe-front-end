import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueSimpleAlert from "vue-simple-alert";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.filter("formatDate", function(value) {
  if (value) {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short"
    }).format(new Date(value));
  }
});

/* import the fontawesome core */
//import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
//Criar um ficheiro para listar todas as fontes e importar em "all"
//import { all } from "@fortawesome/free-solid-svg-icons";
//import { all } from "@fortawesome/free-regular-svg-icons";
//import { all } from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
//library.add(all);

Vue.use(BootstrapVue);
Vue.use(VueSimpleAlert);

//Vue.component("fa", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
