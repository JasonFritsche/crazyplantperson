import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";
import Home from "@/views/user/UserHome.vue";
import Welcome from "../views/Welcome.vue";
import PlantLog from "@/views/user/PlantLog.vue";
import UserDashboard from "@/views/user/UserDashboard.vue";
import PlantDetailsDatePicker from "@/views/user/PlantDetailsDatePicker.vue";

Vue.use(VueRouter);

const lazy = (view) => () => import(`@/views/${view}.vue`);

const routes = [
  {
    path: "/",
    component: Welcome,
  },
  {
    path: "/home",
    component: Home,
    beforeResolve: (to, from, next) => {
      if (!store.state.auth.isUserAuthenticated) {
        next("/signin");
      } else {
        next();
      }
    },
    children: [
      {
        path: "",
        redirect: "dashboard",
      },
      {
        path: "dashboard",
        component: UserDashboard,
      },
      {
        path: "plantlog",
        component: Home,
        children: [
          {
            path: "",
            component: PlantLog,
          },
          {
            path: "plantdetails/:id",
            name: "plantdetailscalendar",
            component: PlantDetailsDatePicker,
            props: true,
          },
        ],
      },
    ],
  },
  {
    path: "/signin",
    name: "signin",
    component: lazy("Login"),
  },
  {
    path: "/register",
    name: "register",
    component: lazy("Register"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
