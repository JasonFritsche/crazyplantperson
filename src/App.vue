<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-main>
      <TheSideNav></TheSideNav>
      <TheToolbar></TheToolbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheToolbar from "./components/single-instance/TheToolbar";
import TheSideNav from "./components/single-instance/TheSideNav";
export default {
  name: "App",
  components: {
    TheToolbar,
    TheSideNav,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  data: () => ({
    //
  }),
};
</script>
