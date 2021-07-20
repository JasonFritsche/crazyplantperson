<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center">
        <PageHeader>Your Dashboard</PageHeader>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <SectionHeader>
          <template v-slot:title>My Watchlist</template>
          <template v-slot:tooltip
            >Plants that you want to keep a close eye on</template
          >
        </SectionHeader>
        <div v-if="!watchlistLoaded" class="d-flex justify-center">
          <v-progress-circular
            indeterminate
            color="iconTwo"
          ></v-progress-circular>
        </div>
        <div v-if="watchlistLoaded && watchlistEmpty">
          <p style="text-align: center">
            You don't have any items in your watchlist
          </p>
        </div>
        <v-list
          class="watchlist"
          v-if="watchlistLoaded && !watchlistEmpty"
          dense
          color="primaryTwo"
          elevation="7"
          rounded
        >
          <v-list-item-group>
            <v-list-item
              class="watchlist-item"
              v-for="(item, i) in watchlist"
              :key="i"
            >
              <v-list-item-content @click="routeToPlant(item)">
                <v-list-item-title v-text="item.plantName"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import PageHeader from "@/components/PageHeader.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Watchlist",
  components: { PageHeader, SectionHeader },
  data() {
    return {
      watchlistEmpty: true,
      watchlistLoaded: false,
    };
  },
  computed: {
    ...mapGetters(["watchlist"]),
  },
  watch: {
    watchlist: function () {
      if (this.watchlist === null) {
        // no watchlist items
        this.watchlistEmpty = true;
        this.watchlistLoaded = true;
      } else if (this.watchlist.length > 0) {
        this.watchlistEmpty = false;
        this.watchlistLoaded = true;
      }
    },
  },
  methods: {
    routeToPlant(plant) {
      this.$router.push({
        name: "plantdetailscalendar",
        params: { plantData: plant, id: plant.id },
      });
    },
  },
  mounted: function () {
    this.$store.dispatch("getWatchlistPlants");
  },
};
</script>

<style>
.watchlist {
  height: 13.7em;
  overflow-y: auto;
}
</style>
