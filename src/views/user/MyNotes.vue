<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center">
        <PageHeader>My Notes</PageHeader>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col>
            <v-card color="primaryTwo" elevation="7">
              <v-card-text>
                <v-textarea
                  name="my-notes"
                  v-model="notesText"
                  :loading="!notesLoaded"
                  :disabled="!notesLoaded"
                  background-color="primaryTwo"
                  elevation="2"
                ></v-textarea>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row>
              <v-col
                ><v-btn
                  class="submit-notes-btn"
                  block
                  color="secondaryOne"
                  @click="submitNotes"
                  >Save</v-btn
                ></v-col
              >
              <v-col
                ><v-btn
                  class="clear-notes-btn"
                  block
                  color="secondaryTwo"
                  @click="clearNotes"
                  >Clear</v-btn
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
import { v4 as uuidv4 } from "uuid";
export default {
  name: "MyNotes",
  components: { PageHeader },
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
    ...mapGetters(["dashboardNotes"]),
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
  },
  mounted: function () {
    this.$store.dispatch("getDashboardNotes");
  },
};
</script>

<style></style>
