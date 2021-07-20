<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="d-flex justify-center">
          <PageHeader>Plant Log</PageHeader>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-col>
          {{ plantLogEntries.length ? hasPlantsText : noPlantsText }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <PlantLogList></PlantLogList>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PageHeader from "@/components/PageHeader.vue";
import PlantLogList from "@/components/PlantLogList.vue";
export default {
  components: { PageHeader, PlantLogList },
  name: "PlantLog",
  data() {
    return {
      hasPlantsText: "",
      noPlantsText:
        "You have no plants in your log, click the button to add one",
    };
  },
  computed: {
    ...mapGetters(["plantLogEntries"]),
  },
};
</script>

<style lang="scss" scoped>
.plantLogHeader {
  margin: auto;
  width: 50%;
}

.header:hover {
  cursor: default;
}
</style>
