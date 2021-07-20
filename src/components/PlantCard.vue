<template>
  <div v-if="plant">
    <v-card
      max-width="385"
      class="ma-2 mt-md-16"
      :class="{ flipIn: isEditMode, flipOut: !isEditMode }"
      color="primaryTwo"
      elevation="10"
    >
      <!-- start display card -->
      <template v-if="!isEditMode">
        <div
          class="d-flex flex-column align-center justify-center ma-n10 pt-n4"
        >
          <v-img width="200" src="@/assets/plant-cartoon-img-sm.png"></v-img>
        </div>
        <v-card-actions class="space card-actions">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="iconOne"
                icon
                @click="editItem()"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit {{ plant.plantName }}</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="iconTwo"
                icon
                @click="goToDetails()"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-notebook</v-icon>
              </v-btn>
            </template>
            <span>Go to Details</span>
          </v-tooltip>

          <v-tooltip top v-if="plant.watch">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                icon
                @click="removeFromWatchlist()"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-star</v-icon>
              </v-btn>
            </template>
            <span>Remove {{ plant.plantName }} from Watchlist</span>
          </v-tooltip>

          <v-tooltip top v-if="!plant.watch">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                icon
                @click="addToWatchlist()"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-star-outline</v-icon>
              </v-btn>
            </template>
            <span>Add {{ plant.plantName }} to Watchlist</span>
          </v-tooltip>
        </v-card-actions>
        <v-card-title class="center card-title py-4">
          {{ plant.plantName }}
        </v-card-title>
        <v-card-text>
          <v-row justify="center" class="py-4">
            <div class="text-subtitle-1">
              {{ plant.plantType }}
            </div>
          </v-row>
          <v-row justify="center" class="py-5">
            <div class="text-subtitle-1">
              {{ plant.dateAcquired | formatDate }}
            </div>
          </v-row>
        </v-card-text>
      </template>
      <!-- end display card -->
      <!-- start editable card -->
      <template v-if="isEditMode">
        <div
          class="d-flex flex-column align-center justify-center ma-n10 pt-n4"
        >
          <v-img width="200" src="@/assets/plant-cartoon-img-sm.png"></v-img>
        </div>
        <v-card-actions class="center card-actions">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="iconOne"
                icon
                @click="saveItem()"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </template>
            <span>Save Changes</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="error"
                icon
                @click="deleteItem()"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete {{ plant.plantName }}</span>
          </v-tooltip>
        </v-card-actions>
        <v-card-title>
          <v-text-field
            v-model="plant.plantName"
            :rules="rules"
            hide-details="auto"
            label="Plant Name"
            clearable
            dense
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="plant.plantType"
            :rules="rules"
            hide-details="auto"
            label="Plant Type"
            clearable
            dense
          ></v-text-field>
          <div>
            <template>
              <vc-date-picker
                class="inline-block h-full"
                v-model="plant.dateAcquired"
                :is-dark="$vuetify.theme.dark"
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <div class="flex items-center">
                    <v-btn
                      icon
                      color="accent"
                      @click="togglePopover()"
                      :disabled="!isEditMode"
                      ><v-icon>mdi-calendar-month</v-icon></v-btn
                    >
                    {{ inputValue }}
                  </div>
                </template>
              </vc-date-picker>
            </template>
          </div>
        </v-card-text>
      </template>
      <!-- end editable card -->
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { formatFirebaseDate } from "@/utils/DateUtil.js";
export default {
  name: "PlantLogCard",
  props: ["plant"],
  data() {
    return {
      isEditMode: false,
      date: new Date(),
      showDatePicker: false,
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
    };
  },
  mounted() {
    this.isEditMode = false;
  },
  methods: {
    ...mapActions(["togglePlantToWatchlist"]),
    editItem() {
      this.isEditMode = true;
    },
    saveItem() {
      this.isEditMode = false;
      this.$store.dispatch("updatePlantEntry", this.plant);
    },
    deleteItem() {
      this.$store.dispatch("deletePlantEntry", this.plant);
    },
    selectDateAcquired() {
      if (this.isEditMode) {
        this.showDatePicker = true;
      }
    },
    goToDetails() {
      this.$router.push({
        name: "plantdetailscalendar",
        params: { id: this.plant.id },
      });
    },
    addToWatchlist() {
      this.plant.watch = true;
      this.togglePlantToWatchlist(this.plant);
    },
    removeFromWatchlist() {
      this.plant.watch = false;
      this.togglePlantToWatchlist(this.plant);
    },
  },
  filters: {
    formatDate: function (date) {
      if (!date) return "";
      return formatFirebaseDate(date);
    },
  },
};
</script>

<style lang="scss" scoped>
.space {
  justify-content: space-evenly;
}
.center {
  justify-content: center;
}

.flipIn {
  animation: flipInY 1s;
}

.flipOut {
  animation: flipInX 1s;
}

@keyframes flipIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
