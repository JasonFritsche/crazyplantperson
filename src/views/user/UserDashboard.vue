<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center">
        <PageHeader>Your Dashboard</PageHeader>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
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
          v-if="watchlistLoaded && !watchlistEmpty"
          dense
          color="primaryTwo"
          elevation="7"
          rounded
        >
          <v-list-item-group>
            <v-list-item v-for="(item, i) in watchlist" :key="i">
              <v-list-item-content @click="routeToPlant(item)">
                <v-list-item-title v-text="item.plantName"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="12" md="6">
        <SectionHeader>
          <template v-slot:title>My Notes</template>
          <template v-slot:tooltip
            >Write helpful notes to your future self</template
          >
        </SectionHeader>
        <v-row>
          <v-col>
            <v-card color="primaryTwo" elevation="7">
              <v-card-text>
                <v-textarea
                  name="my-notes"
                  v-model="notesText"
                  :loading="!notesLoaded"
                  :disabled="!notesLoaded"
                  color="primaryTwo"
                  elevation="7"
                ></v-textarea>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row>
              <v-col
                ><v-btn block color="secondaryOne" @click="submitNotes"
                  >Submit</v-btn
                ></v-col
              >
              <v-col
                ><v-btn block color="secondaryTwo" @click="clearNotes"
                  >clear</v-btn
                ></v-col
              >
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PageHeader from "@/components/PageHeader.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "UserDashboard",
  components: { PageHeader, SectionHeader },
  data() {
    return {
      notesText: "",
      notesLoaded: false,
      notesId: null,
      selectedItem: 1,
      watchlistEmpty: true,
      watchlistLoaded: false,
    };
  },
  computed: {
    ...mapGetters(["dashboardNotes", "watchlist"]),
  },
  watch: {
    dashboardNotes: function () {
      if (this.dashboardNotes) {
        this.notesText = this.dashboardNotes.notes;
        this.notesId = this.dashboardNotes.id;
        this.notesLoaded = true;
      } else {
        this.notesLoaded = true;
        this.notesText = "my notes";
      }
    },
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
    ...mapActions(["updateDashboardNotes"]),
    submitNotes() {
      if (this.notesId === null) {
        this.notesId = uuidv4();
      }
      this.updateDashboardNotes({ notes: this.notesText, id: this.notesId });
    },
    clearNotes() {
      this.notesText = "";
    },
    routeToPlant(plant) {
      this.$router.push({
        name: "plantdetailscalendar",
        params: { plantData: plant, id: plant.id },
      });
    },
  },
  mounted: function () {
    this.$store.dispatch("getDashboardNotes");
    this.$store.dispatch("getWatchlistPlants");
  },
};
</script>

<style></style>
