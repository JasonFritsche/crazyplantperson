<template>
  <v-app-bar color="SecondaryOne">
    <v-app-bar-nav-icon
      @click="openNavigation"
      v-if="!drawerState"
    ></v-app-bar-nav-icon>
    <v-img src="@/assets/cpp.png" max-height="110" max-width="227"></v-img>
    <v-spacer></v-spacer>
    <v-btn icon v-if="!$vuetify.theme.dark" @click="updateTheme('dark')">
      <v-icon class="mr-1" color="blue-grey darken-2"
        >mdi-lightbulb-outline</v-icon
      >
    </v-btn>
    <v-btn icon v-if="$vuetify.theme.dark" @click="updateTheme('light')">
      <v-icon color="yellow darken-3">mdi-lightbulb-outline</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "TheToolbar",
  methods: {
    openNavigation() {
      this.$store.commit("toggleDrawerState", !this.drawerState);
    },
    updateTheme(newTheme) {
      this.$store.commit("setCurrentTheme", newTheme);
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "drawerState"]),
  },
};
</script>
