<template>
  <v-navigation-drawer
    app
    height="100vh"
    color="darken-1 primaryTwo"
    temporary
    v-model="drawerState"
    @mouseleave.native="toggleSidenav"
  >
    <v-list v-if="!isAuthenticated">
      <v-list-item @click="redirectToLogin()" :disabled="isSignInRouteActive">
        <v-list-item-content>
          <v-list-item-title> Sign In </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="redirectToRegister()">
        <v-list-item-content>
          <v-list-item-title>Create Account</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list v-if="isAuthenticated">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ getUser.email }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item @click="signOut()">
        <v-list-item-content>
          <v-list-item-title> Sign Out </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <router-link to="/home/watchlist" v-slot="{ isExactActive, navigate }">
        <v-list-item
          class="nav-item"
          :class="{ activeNavItem: isExactActive }"
          @click="navigate"
        >
          <v-list-item-content>
            <v-list-item-title class="nav-item-title">
              <v-icon>mdi-calendar-today</v-icon>Watch List
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link to="/home/notes" v-slot="{ isExactActive, navigate }">
        <v-list-item
          class="nav-item"
          :class="{ activeNavItem: isExactActive }"
          @click="navigate"
        >
          <v-list-item-content>
            <v-list-item-title class="nav-item-title">
              <v-icon>mdi-calendar-today</v-icon>My Notes
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link to="/home/plantlog" v-slot="{ isExactActive, navigate }">
        <v-list-item
          class="nav-item"
          :class="{ activeNavItem: isExactActive }"
          @click="navigate"
        >
          <v-list-item-content>
            <v-list-item-title class="nav-item-title">
              <v-icon>mdi-calendar-today</v-icon> Plant Log
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TheSideNav",
  computed: {
    ...mapGetters(["getUser", "isAuthenticated"]),
    drawerState: {
      get() {
        return this.$store.getters.drawerState;
      },
      set(toggle) {
        return this.$store.commit("toggleDrawerState", toggle);
      },
    },
    isSignInRouteActive: function () {
      return this.$route.name === "signin";
    },
  },
  methods: {
    ...mapActions(["signOutAction"]),
    redirectToLogin() {
      this.$router.push({ path: "/signin" });
    },
    redirectToRegister() {
      this.$router.push({ path: "/register" });
    },
    toggleSidenav() {
      setTimeout(() => {
        this.$store.commit("toggleDrawerState", false);
      }, 500);
    },
    async signOut() {
      await this.signOutAction();
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss">
.nav-item {
  cursor: pointer;
}
.nav-item:hover {
  background-color: $primary;
  .nav-item-title {
    color: darken($dark-gray, 10) !important;
  }
}
.activeNavItem {
  background-color: lighten($primary, 10) !important;
  .nav-item-title {
    color: darken($dark-gray, 5);
  }
}
</style>
