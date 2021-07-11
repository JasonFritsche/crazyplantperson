import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";
import Home from "@/views/user/UserHome.vue";
import Welcome from "../views/Welcome.vue";
import PlantLog from "@/views/user/PlantLog.vue";
import UserDashboard from "@/views/user/UserDashboard.vue";
import PlantDetailsDatePicker from "@/views/user/PlantDetailsDatePicker.vue";
import { onAuthStateInit } from "../plugins/firebase";

Vue.use(VueRouter);

const lazy = (view) => () => import(`@/views/${view}.vue`);

const routes = [
  {
    path: "/",
    component: Welcome,
    meta: { public: true },
  },
  {
    path: "/home",
    component: Home,
    beforeResolve: (to, from, next) => {
      if (!store.state.auth.isAuthenticated) {
        next("/signin");
      } else {
        next();
      }
    },
    children: [
      {
        path: "",
        redirect: "dashboard",
        meta: { public: false },
      },
      {
        path: "dashboard",
        component: UserDashboard,
        meta: { public: false },
      },
      {
        path: "plantlog",
        component: Home,
        meta: { public: false },
        children: [
          {
            path: "",
            component: PlantLog,
            meta: { public: false },
          },
          {
            path: "plantdetails/:id",
            name: "plantdetailscalendar",
            component: PlantDetailsDatePicker,
            props: true,
            meta: { public: false },
          },
        ],
      },
    ],
  },
  {
    path: "/signin",
    name: "signin",
    component: lazy("Login"),
    meta: { public: true },
  },
  {
    path: "/register",
    name: "register",
    component: lazy("Register"),
    meta: { public: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  await onAuthStateInit(); // wait for auth system to initialise
  if (
    to.matched.every((route) => route.meta.public) ||
    store.getters.isAuthenticated
  ) {
    next();
  } else {
    next({ name: "sign-in" }); // redirect to sign-in page
  }
});

export default router;
