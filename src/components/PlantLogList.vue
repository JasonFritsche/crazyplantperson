<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="py-12">
        <!-- selected plant details -->
        <PlantCard :plant="plantLogEntries[selectedPlantIndex]"></PlantCard>
      </v-col>
      <v-col cols="12" md="6" class="py-5">
        <SectionHeader>
          <template v-slot:title>My Plants</template>
          <template v-slot:tooltip>All of your plants are listed here</template>
          <template v-slot:action>
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="primary"
                  @click="addPlantToLog"
                  class="addPlantBtn pb-4"
                  ><v-icon>mdi-plus</v-icon></v-btn
                >
              </template>
              <span>Add A Plant</span>
            </v-tooltip>
          </template>
        </SectionHeader>
        <!-- list of all plants -->
        <v-list class="plant-log-list" rounded color="primaryTwo" elevation="7">
          <v-list-item-group v-model="selectedPlantIndex" color="primary">
            <v-list-item v-for="(item, i) in plantLogEntries" :key="i">
              <v-list-item-content>
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
import SectionHeader from "@/components/SectionHeader.vue";
import PlantCard from "./PlantCard.vue";
import { v4 as uuidv4 } from "uuid";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
export default {
  components: { PlantCard, SectionHeader },
  data() {
    return {
      selectedPlantIndex: 0,
    };
  },
  methods: {
    addPlantToLog() {
      const newPlant = {
        plantName: uniqueNamesGenerator({
          dictionaries: [adjectives, animals],
          length: 2,
        }),
        plantType: "plant type",
        watch: false,
        id: uuidv4(),
        dateAcquired: new Date(),
      };
      this.$store.dispatch("addPlantToLog", newPlant);
    },
  },
  computed: {
    ...mapGetters(["plantLogEntries"]),
  },
  mounted() {
    if (this.plantLogEntries && this.plantLogEntries.length > 0) {
      return;
    }
    this.$store.dispatch("getAllPlants"); // already fetched.
  },
};
</script>

<style>
.plant-log-list {
  height: 23em;
  overflow-y: auto;
}
.addPlantBtn {
  margin-left: auto;
  align-self: flex-end;
}
</style>
